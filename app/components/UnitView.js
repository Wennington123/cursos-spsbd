"use client";

import Link from "next/link";
import { gradeUnit, unitKey, courseStats, courseStates, unitStates } from "../../lib/course-logic.mjs";
import { saveUnitCompletion } from "../../lib/firebaseClient.mjs";
import { renderContent } from "../../lib/asset.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import Quiz from "./Quiz";

export default function UnitView({ course, unit, catalogo }) {
  const { user, enabled } = useAuth();
  const { progress, erro: erroProgresso } = useProgress(user);
  const st = courseStats(course, progress);
  const states = unitStates(course.units, st.completed);
  const me = states.find((s) => s.id === unit.id);
  const index = course.units.findIndex((u) => u.id === unit.id);
  const next = course.units[index + 1];
  const meuCurso = courseStates(catalogo, progress).find((c) => c.slug === course.slug);
  const bloqueada = (meuCurso ? !meuCurso.unlocked : false) || (me ? !me.unlocked : false);
  const alreadyDone = me?.completed;

  return (
    <>
      <p className="muted">
        <Link href="/">Cursos</Link> · <Link href={`/curso/${course.slug}`}>{course.title}</Link>
      </p>
      <h1>
        <span className="muted">{unit.id}</span> {unit.title}
      </h1>

      <div className="card accent-blue">
        <strong>Objetivos de aprendizagem</strong>
        <ul>
          {unit.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      {bloqueada && (
        <div className="status warn">
          {meuCurso && !meuCurso.unlocked
            ? "Este curso está bloqueado. Conclua o curso anterior por inteiro para liberá-lo."
            : "Esta unidade está bloqueada. Conclua a unidade anterior para liberá-la."}
        </div>
      )}

      {erroProgresso && (
        <div className="status err">
          Não foi possível ler seu progresso no servidor: {erroProgresso}
        </div>
      )}

      <article dangerouslySetInnerHTML={{ __html: renderContent(unit.contentHtml) }} />

      <h2>Avaliação</h2>

      {!enabled && (
        <div className="status warn">Firebase não configurado: a avaliação não pode ser registrada.</div>
      )}
      {enabled && !user && (
        <div className="status warn">Entre com o Google para responder e registrar a conclusão.</div>
      )}

      <Quiz
        questoes={unit.quiz}
        gabarito={course.answers[unit.id]}
        jaConcluido={Boolean(alreadyDone)}
        podeResponder={enabled && Boolean(user) && !bloqueada}
        corrigir={(respostas) => gradeUnit(unit, course.answers, respostas)}
        aoAprovar={(r) => saveUnitCompletion(user, unitKey(course.slug, unit.id), r.score)}
      />

      {alreadyDone && (
        <div className="card accent-green">
          {next ? (
            <Link href={`/curso/${course.slug}/${next.slug}`}>
              <button>Próxima unidade →</button>
            </Link>
          ) : (
            <>
              <strong>Você concluiu as unidades deste curso.</strong>
              <p className="muted" style={{ margin: "4px 0 10px" }}>
                Agora falta a avaliação final, com {course.finalExamCount} questões sobre o conjunto do
                curso. Só com ela aprovada o certificado é liberado.
              </p>
              <Link href={`/curso/${course.slug}/avaliacao`}>
                <button>Ir para a avaliação final →</button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
