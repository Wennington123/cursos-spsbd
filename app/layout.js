import Link from "next/link";
import "./globals.css";
import UserBar from "./components/UserBar";

export const metadata = {
  title: "Cursos SPSBD-GC",
  description: "Formação autoinstrucional do Serviço de Proteção Social Básica no Domicílio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="brand" href="/">
              Cursos SPSBD-GC
              <small>Formação autoinstrucional</small>
            </Link>
            <UserBar />
          </div>
        </header>
        <main className="wrap">{children}</main>
      </body>
    </html>
  );
}
