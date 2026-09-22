"use client";

import Link from "next/link";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import { courseStats } from "../../lib/course-logic.mjs";
import { firebaseEnabled } from "../../lib/firebaseClient.mjs";

const ACCENTS = ["accent-blue", "accent-green", "accent-yellow", "accent-magenta"];

export default function CourseCatalog({ courses }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const totalUnits = courses.reduce((n, c) => n + c.units.length, 0);
  const doneUnits = courses.reduce((n, c) => n + courseStats(c, progress).count, 0);

  return (
    <>
      <h1>Cursos autoinstrucionais do SPSBD-GC</h1>
      <p className="lede">
        Quatro cursos cobrem os fundamentos do Serviço, o desenvolvimento na primeira infância, a prática
        da visita domiciliar e a gestão do serviço. Faça no seu ritmo, na ordem que preferir.
      </p>

      {!enabled && (
        <div className="status warn">
          Firebase não configurado. Defina as variáveis <code>NEXT_PUBLIC_FIREBASE_*</code> para habilitar
          login e progresso. O conteúdo continua navegável.
        </div>
      )}
      {enabled && !user && (
        <div className="status warn">
          Entre com sua conta Google para salvar o progresso e emitir o certificado.
        </div>
      )}

      {enabled && user && (
        <>
          <div className="progress" aria-hidden="true">
            <span style={{ width: `${totalUnits ? (doneUnits / totalUnits) * 100 : 0}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 0 }}>
            {doneUnits} de {totalUnits} unidades concluídas no conjunto dos cursos
          </p>
        </>
      )}

      {courses.map((c, i) => {
        const st = courseStats(c, progress);
        return (
          <div className={`card ${ACCENTS[i % ACCENTS.length]}`} key={c.id}>
            <Link className="course-card" href={`/curso/${c.slug}`}>
              <h2>{c.title}</h2>
              <p className="meta">
                {c.subtitle} · {c.audience} · {c.workload}
              </p>
              <div className="progress" aria-hidden="true">
                <span
                  className={st.complete ? "full" : ""}
                  style={{ width: `${st.total ? (st.count / st.total) * 100 : 0}%` }}
                />
              </div>
              <p className="muted" style={{ margin: "4px 0 0", fontSize: ".85rem" }}>
                {st.count} de {st.total} unidades
                {st.complete ? " · concluído" : ""}
              </p>
            </Link>
          </div>
        );
      })}

      <p className="muted" style={{ marginTop: 28, fontSize: ".88rem" }}>
        Verificação de certificado: <Link href="/verificar/">/verificar</Link>
      </p>
    </>
  );
}
