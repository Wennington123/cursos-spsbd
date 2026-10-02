"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCertificate, issueCertificate } from "../../lib/firebaseClient.mjs";
import { courseStats } from "../../lib/course-logic.mjs";
import { asset } from "../../lib/asset.mjs";
import { cpfValido, formatarCPF, mascararCPF, nomeCompletoValido } from "../../lib/documentos.mjs";
import { emissorConfigurado } from "../../lib/emissor.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

function dataBR(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function periodoBR(inicio, fim) {
  const a = dataBR(inicio);
  const b = dataBR(fim);
  if (!a && !b) return "";
  if (!a || a === b) return b || a;
  return `${a} a ${b}`;
}

export default function CertificateView({ course }) {
  const { user, enabled } = useAuth();
  const { progress } = useProgress(user);
  const st = courseStats(course, progress);
  const configurado = emissorConfigurado();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cert, setCert] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [origem, setOrigem] = useState("");

  useEffect(() => {
    setOrigem(window.location.origin);
  }, []);

  // Reaproveita o que já foi informado antes, para não digitar de novo.
  useEffect(() => {
    const dados = progress?.dados;
    if (!dados) return;
    setNome((atual) => atual || dados.nome || "");
    setCpf((atual) => atual || formatarCPF(dados.cpf || ""));
  }, [progress]);

  // Certificado já emitido: recarrega o registro para permitir reimprimir.
  useEffect(() => {
    const codigo = progress?.certificates?.[course.id];
    if (!codigo || cert) return;
    let ativo = true;
    getCertificate(codigo)
      .then((doc) => {
        if (ativo && doc) setCert({ ...doc, code: codigo, course: doc.courseTitle || course.title });
      })
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, [progress, course.id, course.title, cert]);

  async function emit(evento) {
    evento.preventDefault();
    setError("");

    if (!nomeCompletoValido(nome)) {
      setError("Informe seu nome completo, com ao menos duas palavras.");
      return;
    }
    if (!cpfValido(cpf)) {
      setError("CPF inválido. Confira os 11 dígitos.");
      return;
    }

    setBusy(true);
    try {
      setCert(await issueCertificate(user, course, { nome, cpf }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const linkVerificacao = cert ? `${origem}${asset("/verificar/")}?codigo=${cert.code}` : "";

  return (
    <>
      <p className="muted print-hide">
        <Link href="/">Cursos</Link> · <Link href={`/curso/${course.slug}`}>{course.title}</Link>
      </p>
      <h1 className="print-hide">Certificado</h1>

      {!enabled && <div className="status warn">Firebase não configurado.</div>}
      {enabled && !user && (
        <div className="status warn print-hide">Entre com o Google para emitir o certificado.</div>
      )}
      {enabled && user && !st.complete && (
        <div className="status warn print-hide">
          {!st.unitsComplete ? (
            `Conclua todas as unidades para emitir o certificado (${st.count}/${st.total}).`
          ) : (
            <>
              Falta a avaliação final: ela precisa ser aprovada antes de emitir o certificado.{" "}
              <Link href={`/curso/${course.slug}/avaliacao`}>Ir para a avaliação final</Link>
            </>
          )}
        </div>
      )}

      {!configurado && (
        <div className="status warn print-hide">
          Emissão indisponível: a identificação de quem certifica (nome e função) precisa ser conferida em
          <code> lib/emissor.mjs</code>.
        </div>
      )}

      {error && <div className="status err print-hide">{error}</div>}

      {!cert && enabled && user && st.complete && configurado && (
        <form className="card print-hide" onSubmit={emit}>
          <strong>Dados que constarão no certificado</strong>
          <p className="muted" style={{ margin: "6px 0 0", fontSize: ".9rem" }}>
            O certificado de curso livre exige nome completo e CPF. Confira antes de emitir: o registro
            fica gravado e não pode ser alterado depois.
          </p>

          <div className="field">
            <label className="rotulo" htmlFor="cert-nome">
              Nome completo
            </label>
            <input
              id="cert-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              placeholder="Ex.: Maria da Silva Santos"
            />
          </div>

          <div className="field">
            <label className="rotulo" htmlFor="cert-cpf">
              CPF
            </label>
            <input
              id="cert-cpf"
              type="text"
              inputMode="numeric"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
              placeholder="000.000.000-00"
            />
          </div>

          <button disabled={busy}>{busy ? "Emitindo…" : "Emitir certificado"}</button>
        </form>
      )}

      {cert && (
        <>
          <article className="cert" id="certificado">
            <div className="cert-logos">
              <img
                className="cert-logo-servico"
                src={asset("/logos/spsbd-gc.png")}
                alt="SPSBD-GC — Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos"
              />
              <img className="cert-logo-cras" src={asset("/logos/cras.png")} alt="CRAS — Centro de Referência de Assistência Social" />
              <img
                className="cert-logo-prefeitura"
                src={asset("/logos/petrolina-sads.jpg")}
                alt="Secretaria de Assistência Social e Combate à Fome — Prefeitura de Petrolina"
              />
            </div>

            <p className="cert-etiqueta">Certificado de conclusão de curso livre</p>

            <h2 className="cert-nome">{cert.name}</h2>
            <p className="cert-cpf">
              CPF {mascararCPF(cert.cpf || "")}
              <span className="cert-cpf-nota"> — dígitos protegidos; a conferência é feita pelo código</span>
            </p>

            <p className="cert-texto">
              concluiu o curso <strong>{cert.course}</strong>, com carga horária de{" "}
              <strong>{cert.cargaHoraria || course.cargaHoraria}</strong>, na modalidade autoinstrucional, no
              período de <strong>{periodoBR(cert.periodoInicio, cert.periodoFim)}</strong>, com certificação
              emitida por <strong>{cert.emissor?.nome}</strong>
              {cert.emissor?.cargo ? `, ${cert.emissor.cargo}` : ""}.
            </p>

            <section className="cert-ementa">
              <h3>Conteúdo programático</h3>
              <ul>
                {(cert.ementa || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <div className="cert-baixo">
              <div className="cert-emissor">
                <strong>{cert.emissor?.vinculo}</strong>
                {cert.emissor?.cidade && <span>{cert.emissor.cidade}</span>}
                <span>Data de conclusão: {dataBR(cert.periodoFim || cert.issuedAt)}</span>
                <span>Emitido em {dataBR(cert.issuedAt)}</span>
              </div>

              <div className="cert-assinatura">
                <img src={asset("/assinatura.png")} alt="Assinatura de quem certifica" />
                <span className="cert-linha" aria-hidden="true" />
                <span className="cert-assinante">{cert.emissor?.nome}</span>
                <span className="cert-cargo">{cert.emissor?.cargo} — certificador</span>
              </div>
            </div>

            <footer className="cert-rodape">
              <span className="cert-codigo">
                Registro de autenticidade · código <span className="code">{cert.code}</span>
              </span>
              <span className="cert-nota">
                Confira este registro em {linkVerificacao} · Curso livre de atualização e qualificação
                profissional, na modalidade autoinstrucional.
              </span>
            </footer>
          </article>

          <p className="muted print-hide" style={{ fontSize: ".88rem" }}>
            <button className="ghost" onClick={() => window.print()}>Imprimir ou salvar em PDF (A4 paisagem)</button>
            {" · "}
            <Link href={`/verificar/?codigo=${cert.code}`}>Conferir o registro</Link>
          </p>
        </>
      )}
    </>
  );
}
