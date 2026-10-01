"use client";

import Link from "next/link";
import { signInWithGoogle, signOut } from "../../lib/firebaseClient.mjs";
import { asset } from "../../lib/asset.mjs";
import { useAuth } from "./useAuth";

export default function UserBar() {
  const { user, ready, enabled } = useAuth();

  if (!enabled) {
    return <span className="muted" style={{ fontSize: ".85rem" }}>Firebase não configurado</span>;
  }
  if (!ready) {
    return <span className="muted" style={{ fontSize: ".85rem" }}>carregando…</span>;
  }
  if (!user) {
    return (
      <button className="btn-google" onClick={() => signInWithGoogle().catch(() => {})}>
        <img src={asset("/logos/google.png")} alt="" aria-hidden="true" />
        Entrar com Google
      </button>
    );
  }
  return (
    <span className="row" style={{ fontSize: ".9rem" }}>
      <Link className="muted" href="/perfil/" title="Meu perfil">
        {user.displayName || user.email}
      </Link>
      <button className="ghost" onClick={() => signOut()}>Sair</button>
    </span>
  );
}
