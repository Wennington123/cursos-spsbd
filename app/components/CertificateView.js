"use client";

import Link from "next/link";
import { useState } from "react";
import { issueCertificate } from "../../lib/firebaseClient.mjs";
import { courseStats } from "../../lib/course-logic.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

export default function CertificateView({ course }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const st = courseStats(course, progress);

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
      <p className="muted">
        <Link href="/">Cursos</Link> · <Link href={`/curso/${course.slug}`}>{course.title}</Link>
      </p>
      <h1>Certificado</h1>

      {!enabled && <div className="status warn">Firebase não configurado.</div>}
      {enabled && !user && <div className="status warn">Entre com o Google para emitir o certificado.</div>}
      {enabled && user && !st.complete && (
        <div className="status warn">
          Conclua todas as unidades para emitir o certificado ({st.count}/{st.total}).
        </div>
      )}

      {error && <div className="status err">{error}</div>}

      {!cert && enabled && user && st.complete && (
        <button onClick={emit} disabled={busy}>{busy ? "Emitindo…" : "Emitir certificado"}</button>
      )}

      {cert && (
        <>
          <div className="cert">
            <p className="muted" style={{ margin: 0 }}>Certificado de conclusão</p>
            <h2 style={{ margin: "10px 0" }}>{cert.name}</h2>
            <p style={{ margin: "0 0 6px" }}>concluiu o curso</p>
            <p><strong>{cert.course}</strong></p>
            <div className="rule" aria-hidden="true">
              <span style={{ background: "var(--blue)" }} />
              <span style={{ background: "var(--green)" }} />
              <span style={{ background: "var(--yellow)" }} />
              <span style={{ background: "var(--orange)" }} />
              <span style={{ background: "var(--red)" }} />
              <span style={{ background: "var(--magenta)" }} />
              <span style={{ background: "var(--purple)" }} />
            </div>
            <p className="muted" style={{ fontSize: ".85rem" }}>
              Código de verificação: <span className="code">{cert.code}</span>
            </p>
          </div>
          <p className="muted print-hide" style={{ fontSize: ".88rem" }}>
            Confirme em <Link href={`/verificar/?codigo=${cert.code}`}>/verificar/?codigo={cert.code}</Link>
            {" · "}
            <button className="ghost" onClick={() => window.print()}>Imprimir</button>
          </p>
        </>
      )}
    </>
  );
}
