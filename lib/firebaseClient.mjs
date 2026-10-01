import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(config.apiKey && config.projectId);
export const projetoId = config.projectId || "";

function app() {
  if (!firebaseEnabled) throw new Error("Firebase não configurado (variáveis NEXT_PUBLIC_FIREBASE_*).");
  return getApps().length ? getApp() : initializeApp(config);
}

export function auth() {
  return getAuth(app());
}

export function db() {
  return getFirestore(app());
}

export function signInWithGoogle() {
  return signInWithPopup(auth(), new GoogleAuthProvider());
}

export function signOut() {
  return fbSignOut(auth());
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth(), callback);
}

export function watchProgress(uid, callback, onError) {
  return onSnapshot(
    doc(db(), "progress", uid),
    (snap) => {
      callback(snap.exists() ? snap.data() : { units: {} });
    },
    (erro) => {
      if (onError) onError(erro);
    }
  );
}

export async function getProgressOnce(uid) {
  const snap = await getDoc(doc(db(), "progress", uid));
  return snap.exists() ? snap.data() : { units: {} };
}

export async function saveUnitCompletion(user, unitKey, score) {
  const ref = doc(db(), "progress", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      units: { [unitKey]: { completed: true, score } },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  // Confere se a gravação realmente chegou ao servidor. Sem isso, uma falha de
  // permissão ou de rede deixa a tela dizendo "concluído" e o dado some depois.
  const conferencia = await getDoc(ref);
  const gravado = conferencia.exists() ? conferencia.data()?.units?.[unitKey] : null;
  if (!gravado || gravado.completed !== true) {
    throw new Error(
      "A conclusão não foi gravada no servidor. Verifique as regras do Firestore (firestore.rules) e se você continua conectado."
    );
  }
  return true;
}

export function makeCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export async function issueCertificate(user, course) {
  const progress = await getProgressOnce(user.uid);
  const existing = progress?.certificates?.[course.id];
  const name = user.displayName || user.email || "Participante";

  if (existing) {
    const guardado = await getCertificate(existing);
    return {
      code: existing,
      name: guardado?.name || name,
      course: guardado?.courseTitle || course.title,
      cargaHoraria: guardado?.cargaHoraria || course.cargaHoraria || "",
      issuedAt: guardado?.issuedAt || null,
    };
  }

  const code = makeCode();
  const issuedAt = new Date().toISOString();
  await setDoc(doc(db(), "certificates", code), {
    uid: user.uid,
    name,
    courseId: course.id,
    courseTitle: course.title,
    cargaHoraria: course.cargaHoraria || "",
    issuedAt,
  });
  await setDoc(
    doc(db(), "progress", user.uid),
    { certificates: { [course.id]: code } },
    { merge: true }
  );
  return {
    code,
    name,
    course: course.title,
    cargaHoraria: course.cargaHoraria || "",
    issuedAt,
  };
}

export async function getCertificate(code) {
  const snap = await getDoc(doc(db(), "certificates", code));
  return snap.exists() ? snap.data() : null;
}
