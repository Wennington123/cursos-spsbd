"use client";

import Link from "next/link";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import { courseStats, unitStates } from "../../lib/course-logic.mjs";
import { firebaseEnabled } from "../../lib/firebaseClient.mjs";

export default function CourseHome({ course }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const st = courseStats(course, progress);
  const states = unitStates(course.units, st.completed);

  return (
    <>
      <p className="muted"><Link href="/">← Todos os cursos</Link></p>
      <h1>{course.title}</h1>
      <p className="lede">
        {course.subtitle} — {course.audience} · {course.workload}
      </p>

      {!enabled && (
        <div className="status warn">
          Firebase não configurado. Defina as variáveis <code>NEXT_PUBLIC_FIREBASE_*</code> para habilitar
          login e progresso.
        </div>
      )}
      {enabled && !user && (
        <div className="status warn">Entre com o Google para salvar o progresso e emitir o certificado.</div>
      )}

      <div className="progress" aria-hidden="true">
        <span
          className={st.complete ? "full" : ""}
          style={{ width: `${st.total ? (st.count / st.total) * 100 : 0}%` }}
        />
      </div>
      <p className="muted" style={{ marginTop: 0 }}>
        {st.count} de {st.total} unidades concluídas
      </p>

      <ul className="units">
        {states.map((s) => {
          const cls = s.completed ? "unit-link done" : s.unlocked ? "unit-link" : "unit-link locked";
          const label = s.completed ? "concluída" : s.unlocked ? "disponível" : "bloqueada";
          const inner = (
            <>
              <span className="tag">{s.id}</span>
              <span>{s.title}</span>
              <span className="muted" style={{ marginLeft: "auto", fontSize: ".82rem" }}>{label}</span>
            </>
          );
          return (
            <li key={s.id}>
              {s.unlocked ? (
                <Link className={cls} href={`/curso/${course.slug}/${s.slug}`}>{inner}</Link>
              ) : (
                <span className={cls}>{inner}</span>
              )}
            </li>
          );
        })}
      </ul>

      {st.complete && (
        <div className="card accent-green">
          <strong>Curso concluído!</strong>
          <p className="muted">Você pode emitir seu certificado.</p>
          <Link href={`/curso/${course.slug}/certificado`}>
            <button>Emitir certificado</button>
          </Link>
        </div>
      )}
    </>
  );
}
