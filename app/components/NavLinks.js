"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const caminho = usePathname() || "/";
  const emCursos = caminho === "/" || caminho.startsWith("/curso");
  const emPerfil = caminho.startsWith("/perfil");

  return (
    <nav className="nav" aria-label="Navegação principal">
      <Link href="/" className={emCursos ? "ativo" : ""} aria-current={emCursos ? "page" : undefined}>
        Cursos
      </Link>
      <Link href="/perfil/" className={emPerfil ? "ativo" : ""} aria-current={emPerfil ? "page" : undefined}>
        Meu perfil
      </Link>
    </nav>
  );
}
