"use client";

import Link from "next/link";
import { useState } from "react";
import { course } from "../../lib/courses.mjs";
import { firebaseEnabled, issueCertificate } from "../../lib/firebaseClient.mjs";
import { completedUnitIds, isCourseComplete } from "../../lib/course-logic.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

export default function CertificateView() {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const completed = completedUnitIds(progress);
  const complete = isCourseComplete(course.units, completed);

  const [cert, setCert] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function emit() {
    setError("");
    setBusy(true);
    try {
      setCert(await issueCertificate(user, course.id, course.title));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="muted"><Link href="/">← Voltar ao curso</Link></p>
      <h1>Certificado</h1>

      {!enabled && <div className="status warn">Firebase não configurado.</div>}
      {enabled && !user && <div className="status warn">Entre com o Google para emitir o certificado.</div>}
      {enabled && user && !complete && (
        <div className="status warn">
          Conclua todas as unidades para emitir o certificado ({completed.length}/{course.units.length}).
        </div>
      )}

      {error && <div className="status err">{error}</div>}

      {!cert && enabled && user && complete && (
        <button onClick={emit} disabled={busy}>{busy ? "Emitindo…" : "Emitir certificado"}</button>
      )}

      {cert && (
        <>
          <div className="cert">
            <p className="muted" style={{ margin: 0 }}>Certificado de conclusão</p>
            <h2 style={{ margin: "10px 0" }}>{cert.name}</h2>
            <p style={{ margin: "0 0 6px" }}>concluiu o curso</p>
            <p><strong>{cert.course}</strong></p>
            <p className="muted" style={{ fontSize: ".85rem" }}>
              Código de verificação: <span className="code">{cert.code}</span>
            </p>
          </div>
          <p className="muted" style={{ fontSize: ".88rem" }}>
            Confirme em <Link href={`/verificar/?codigo=${cert.code}`}>/verificar/?codigo={cert.code}</Link>
            {" · "}
            <button className="ghost" onClick={() => window.print()}>Imprimir</button>
          </p>
        </>
      )}
    </>
  );
}
