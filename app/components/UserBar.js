"use client";

import { signInWithGoogle, signOut } from "../../lib/firebaseClient.mjs";
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
      <button onClick={() => signInWithGoogle().catch(() => {})}>
        Entrar com Google
      </button>
    );
  }
  return (
    <span className="row" style={{ fontSize: ".9rem" }}>
      <span className="muted">{user.displayName || user.email}</span>
      <button className="ghost" onClick={() => signOut()}>Sair</button>
    </span>
  );
}
