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

export function watchProgress(uid, callback) {
  return onSnapshot(doc(db(), "progress", uid), (snap) => {
    callback(snap.exists() ? snap.data() : { units: {} });
  });
}

export async function getProgressOnce(uid) {
  const snap = await getDoc(doc(db(), "progress", uid));
  return snap.exists() ? snap.data() : { units: {} };
}

export async function saveUnitCompletion(user, unitId, score) {
  await setDoc(
    doc(db(), "progress", user.uid),
    {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      units: { [unitId]: { completed: true, score } },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function makeCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export async function issueCertificate(user, courseId, courseTitle) {
  const progress = await getProgressOnce(user.uid);
  const existing = progress?.certificates?.[courseId];
  const name = user.displayName || user.email || "Participante";

  if (existing) return { code: existing, name, course: courseTitle };

  const code = makeCode();
  await setDoc(doc(db(), "certificates", code), {
    uid: user.uid,
    name,
    courseId,
    courseTitle,
    issuedAt: new Date().toISOString(),
  });
  await setDoc(
    doc(db(), "progress", user.uid),
    { certificates: { [courseId]: code } },
    { merge: true }
  );
  return { code, name, course: courseTitle };
}

export async function getCertificate(code) {
  const snap = await getDoc(doc(db(), "certificates", code));
  return snap.exists() ? snap.data() : null;
}
