"use client";

import Link from "next/link";
import { useState } from "react";
import { issueCertificate } from "../../lib/firebaseClient.mjs";
import { courseStats } from "../../lib/course-logic.mjs";
import { asset } from "../../lib/asset.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

export default function CertificateView({ course }) {
  const { user, enabled } = useAuth();
  const { progress } = useProgress(user);
  const st = courseStats(course, progress);

  const [cert, setCert] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function emit() {
    setError("");
    setBusy(true);
    try {
      setCert(await issueCertificate(user, course));
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
          <article className="cert">
            <div className="cert-logo">
              <img src={asset("/logos/spsbd-gc.png")} alt="SPSBD-GC — Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos" />
            </div>

            <p className="cert-etiqueta">Certificado de conclusão</p>

            <h2 className="cert-nome">{cert.name}</h2>

            <p className="cert-texto">
              concluiu o curso <strong>{cert.course}</strong>, com carga horária de{" "}
              <strong>{cert.cargaHoraria || course.cargaHoraria}</strong>, oferecido pela plataforma de
              formação autoinstrucional do Serviço de Proteção Social Básica no Domicílio para Gestantes
              e Crianças de 0 a 6 anos, no âmbito do Sistema Único de Assistência Social (SUAS).
            </p>

            <p className="cert-data">
              {cert.issuedAt
                ? `Emitido em ${new Date(cert.issuedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`
                : ""}
            </p>

            <div className="cert-assinatura">
              <img src={asset("/assinatura.png")} alt={`Assinatura de Wennington Dias Aquino`} />
              <span className="cert-linha" aria-hidden="true" />
              <span className="cert-assinante">Wennington Dias Aquino</span>
              <span className="cert-cargo">Técnico de Referência do SPSBD-GC — certificador</span>
            </div>

            <div className="cert-rodape">
              <span className="cert-codigo">
                Código de verificação: <span className="code">{cert.code}</span>
              </span>
              <span className="cert-nota">
                Autenticidade conferível em /verificar/ · iniciativa independente, sem vínculo institucional.
              </span>
            </div>
          </article>

          <p className="muted print-hide" style={{ fontSize: ".88rem" }}>
            Confirme em <Link href={`/verificar/?codigo=${cert.code}`}>/verificar/?codigo={cert.code}</Link>
            {" · "}
            <button className="ghost" onClick={() => window.print()}>Imprimir ou salvar em PDF</button>
          </p>
        </>
      )}
    </>
  );
}
