import Link from "next/link";
import "./globals.css";
import UserBar from "./components/UserBar";
import { asset } from "../lib/asset.mjs";

export const metadata = {
  title: "Cursos SPSBD-GC",
  description:
    "Formação autoinstrucional do Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="brand" href="/">
              <img
                src={asset("/logos/spsbd-gc.png")}
                alt="SPSBD-GC — Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos"
              />
              <span className="brand-title">
                Cursos SPSBD-GC
                <small>Formação autoinstrucional</small>
              </span>
            </Link>
            <UserBar />
          </div>
          <div className="stripe" aria-hidden="true">
            <span className="c1" /><span className="c2" /><span className="c3" /><span className="c4" />
            <span className="c5" /><span className="c6" /><span className="c7" />
          </div>
        </header>

        <main className="wrap">{children}</main>

        <footer className="foot">
          <div className="wrap">
            <div className="foot-logos">
              <img src={asset("/logos/cras.png")} alt="CRAS — Centro de Referência de Assistência Social" />
              <img
                src={asset("/logos/petrolina-sads.jpg")}
                alt="Secretaria de Assistência Social e Combate à Fome — Prefeitura de Petrolina"
              />
            </div>
            <p>
              Plataforma de formação autoinstrucional do SPSBD-GC. Conteúdo baseado nos cadernos do
              Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos.
            </p>
            <p className="creditos">
              Desenvolvido de forma independente por{" "}
              <strong>Wennington Dias Aquino</strong>, técnico social.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
