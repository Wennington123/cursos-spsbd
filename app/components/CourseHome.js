"use client";

import Link from "next/link";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import { completedUnitIds, unitStates, isCourseComplete } from "../../lib/course-logic.mjs";

export default function CourseHome({ course }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const completed = completedUnitIds(progress);
  const states = unitStates(course.units, completed);
  const done = completed.length;

  return (
    <>
      <h1>{course.title}</h1>
      <p className="lede">{course.subtitle} — {course.audience} · {course.workload}</p>

      {!enabled && (
        <div className="status warn">
          Firebase não configurado. Defina as variáveis <code>NEXT_PUBLIC_FIREBASE_*</code> para habilitar
          login e progresso. O conteúdo abaixo continua navegável.
        </div>
      )}
      {enabled && !user && (
        <div className="status warn">
          Entre com sua conta Google para salvar o progresso e receber o certificado.
        </div>
      )}

      <div className="progress" aria-hidden="true">
        <span style={{ width: `${(done / course.units.length) * 100}%` }} />
      </div>
      <p className="muted" style={{ marginTop: 0 }}>
        {done} de {course.units.length} unidades concluídas
      </p>

      <ul className="units">
        {states.map((s) => {
          const cls = s.completed ? "unit-link done" : s.unlocked ? "unit-link" : "unit-link locked";
          const label = s.completed ? "concluída" : s.unlocked ? "disponível" : "bloqueada";
          if (!s.unlocked) {
            return (
              <li key={s.id}>
                <span className={cls}>
                  <span className="tag">{s.id}</span>
                  <span>{s.title}</span>
                  <span className="muted" style={{ marginLeft: "auto", fontSize: ".82rem" }}>{label}</span>
                </span>
              </li>
            );
          }
          return (
            <li key={s.id}>
              <Link className={cls} href={`/unidade/${s.slug}`}>
                <span className="tag">{s.id}</span>
                <span>{s.title}</span>
                <span className="muted" style={{ marginLeft: "auto", fontSize: ".82rem" }}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {isCourseComplete(course.units, completed) && (
        <div className="card">
          <strong>Curso concluído!</strong>
          <p className="muted">Você pode emitir seu certificado.</p>
          <Link href="/certificado"><button>Emitir certificado</button></Link>
        </div>
      )}

      <p className="muted" style={{ marginTop: 28, fontSize: ".88rem" }}>
        Verificação de certificado: <Link href="/verificar">/verificar</Link>
      </p>
    </>
  );
}
