"use client";

import { useEffect, useState } from "react";
import { firebaseEnabled, getCertificate } from "../../lib/firebaseClient.mjs";

export default function VerifyView() {
  const [code, setCode] = useState("");
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function check(value) {
    const c = (value || "").trim().toUpperCase();
    if (!c) return;
    setBusy(true);
    setError("");
    setState(null);
    try {
      if (!firebaseEnabled) throw new Error("Firebase não configurado.");
      const data = await getCertificate(c);
      if (!data) throw new Error("Código não encontrado.");
      setState({ ...data, code: c });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("codigo");
    if (initial) {
      setCode(initial.toUpperCase());
      check(initial);
    }
  }, []);

  return (
    <>
      <h1>Verificar certificado</h1>
      <p className="lede">Informe o código de verificação para conferir o registro.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          check(code);
        }}
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Ex.: A1B2C3D4E5F6"
          aria-label="Código de verificação"
        />
        <button disabled={busy}>{busy ? "Consultando…" : "Verificar"}</button>
      </form>

      {error && <div className="status err">{error}</div>}

      {state && (
        <div className="card">
          <div className="status ok">Registro encontrado.</div>
          <p style={{ margin: 0 }}><strong>{state.name}</strong></p>
          <p className="muted" style={{ margin: 0 }}>{state.courseTitle}</p>
          <p className="muted" style={{ margin: 0, fontSize: ".85rem" }}>
            Código {state.code} · emitido em {new Date(state.issuedAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}
    </>
  );
}
