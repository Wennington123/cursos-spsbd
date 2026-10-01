"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import { courseStates } from "../../lib/course-logic.mjs";
import { firebaseEnabled, issueCertificate, getCertificate, projetoId } from "../../lib/firebaseClient.mjs";

export default function PerfilView({ catalogo }) {
  const { user, ready, enabled } = useAuth();
  const { progress, erro: erroProgresso } = useProgress(user);
  const estados = courseStates(catalogo, progress);
  const emitidos = progress?.certificates || {};
  const chaveCerts = Object.values(emitidos).sort().join(",");

  const [datas, setDatas] = useState({});
  const [ocupado, setOcupado] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!firebaseEnabled || !user || !chaveCerts) {
      setDatas({});
      return;
    }
    let ativo = true;
    const codigos = chaveCerts.split(",");
    Promise.all(codigos.map(async (c) => [c, await getCertificate(c)]))
      .then((pares) => {
        if (!ativo) return;
        const mapa = {};
        for (const [codigo, doc] of pares) if (doc) mapa[codigo] = doc.issuedAt;
        setDatas(mapa);
      })
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, [user, chaveCerts]);

  const totalUnidades = estados.reduce((n, c) => n + c.total, 0);
  const unidadesFeitas = estados.reduce((n, c) => n + c.count, 0);

  async function emitir(curso) {
    setErro("");
    setOcupado(curso.slug);
    try {
      await issueCertificate(user, curso);
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado("");
    }
  }

  if (!enabled) {
    return (
      <>
        <h1>Meu perfil</h1>
        <div className="status warn">Firebase não configurado.</div>
      </>
    );
  }

  if (!ready) {
    return (
      <>
        <h1>Meu perfil</h1>
        <p className="muted">carregando…</p>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <h1>Meu perfil</h1>
        <div className="status warn">Entre com sua conta Google para ver seu progresso e seus certificados.</div>
        <p className="muted"><Link href="/">← Voltar aos cursos</Link></p>
      </>
    );
  }

  const comCertificado = estados.filter((c) => emitidos[c.id]);

  return (
    <>
      <h1>Meu perfil</h1>

      <div className="card accent-blue perfil-cabecalho">
        {user.photoURL && <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
        <div>
          <div className="nome">{user.displayName || "Participante"}</div>
          <div className="muted" style={{ fontSize: ".9rem" }}>{user.email}</div>
        </div>
      </div>

      <div className="card">
        <strong>Progresso geral</strong>
        <div className="progress" aria-hidden="true">
          <span
            className={unidadesFeitas === totalUnidades ? "full" : ""}
            style={{ width: `${totalUnidades ? (unidadesFeitas / totalUnidades) * 100 : 0}%` }}
          />
        </div>
        <p className="muted" style={{ margin: "6px 0 0" }}>
          {unidadesFeitas} de {totalUnidades} unidades concluídas · {comCertificado.length} certificado(s)
        </p>
      </div>

      <h2>Cursos</h2>
      {estados.map((c) => (
        <div className="card" key={c.id}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <strong>{c.title}</strong>
            <span className="muted" style={{ fontSize: ".85rem" }}>
              {c.count}/{c.total}
              {c.complete ? " · concluído" : c.unlocked ? "" : " · bloqueado"}
            </span>
          </div>
          <div className="progress" aria-hidden="true">
            <span
              className={c.complete ? "full" : ""}
              style={{ width: `${c.total ? (c.count / c.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}

      <h2>Meus certificados</h2>
      {erro && <div className="status err">{erro}</div>}

      {comCertificado.length === 0 && (
        <p className="muted">
          Você ainda não emitiu certificados. Eles aparecem aqui ao concluir cada curso.
        </p>
      )}

      {comCertificado.length > 0 && (
        <ul className="lista-certs">
          {comCertificado.map((c) => {
            const codigo = emitidos[c.id];
            return (
              <li key={c.id}>
                <strong>{c.title}</strong>
                <span className="muted codigo">{codigo}</span>
                {datas[codigo] && (
                  <span className="muted" style={{ fontSize: ".85rem" }}>
                    emitido em {new Date(datas[codigo]).toLocaleDateString("pt-BR")}
                  </span>
                )}
                <Link style={{ marginLeft: "auto" }} href={`/verificar/?codigo=${codigo}`}>
                  verificar
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {estados.some((c) => c.complete && !emitidos[c.id]) && (
        <>
          <h3>Disponíveis para emitir</h3>
          {estados
            .filter((c) => c.complete && !emitidos[c.id])
            .map((c) => (
              <div className="card accent-green" key={c.id}>
                <strong>{c.title}</strong>
                <p className="muted" style={{ margin: "4px 0 10px" }}>
                  Curso concluído. Emita seu certificado.
                </p>
                <button onClick={() => emitir(c)} disabled={ocupado === c.slug}>
                  {ocupado === c.slug ? "Emitindo…" : "Emitir certificado"}
                </button>
              </div>
            ))}
        </>
      )}

      <details className="card">
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Diagnóstico da conta</summary>
        <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
          <li>
            Projeto Firebase: <code>{projetoId || "não configurado"}</code>
          </li>
          <li>
            Sessão: {user.uid ? `ativa (${String(user.uid).slice(0, 8)}…)` : "sem sessão"}
          </li>
          <li>
            Leitura do progresso no servidor:{" "}
            {erroProgresso ? <strong style={{ color: "#a02020" }}>falhou — {erroProgresso}</strong> : "ok"}
          </li>
          <li>Unidades gravadas no seu documento: {Object.keys(progress?.units || {}).length}</li>
          <li>
            Chaves gravadas:{" "}
            <code style={{ wordBreak: "break-all" }}>
              {Object.entries(progress?.units || {})
                .map(([chave, valor]) => `${chave}${valor?.completed ? "" : " (incompleta)"}`)
                .join(" · ") || "nenhuma"}
            </code>
          </li>
          <li>Certificados registrados: {Object.keys(emitidos).length}</li>
        </ul>
      </details>

      <p className="muted" style={{ marginTop: 28, fontSize: ".88rem" }}>
        <Link href="/">← Voltar aos cursos</Link>
      </p>
    </>
  );
}
