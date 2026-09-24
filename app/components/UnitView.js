"use client";

import Link from "next/link";
import { useState } from "react";
import { gradeUnit, unitKey, courseStats, unitStates } from "../../lib/course-logic.mjs";
import { firebaseEnabled, saveUnitCompletion } from "../../lib/firebaseClient.mjs";
import { renderContent } from "../../lib/asset.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

export default function UnitView({ course, unit }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const st = courseStats(course, progress);
  const states = unitStates(course.units, st.completed);
  const me = states.find((s) => s.id === unit.id);
  const index = course.units.findIndex((u) => u.id === unit.id);
  const next = course.units[index + 1];

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const alreadyDone = me?.completed;

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const graded = gradeUnit(unit, course.answers, answers);
      if (graded.passed) {
        await saveUnitCompletion(user, unitKey(course.slug, unit.id), graded.score);
      }
      setResult(graded);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="muted">
        <Link href="/">Cursos</Link> · <Link href={`/curso/${course.slug}`}>{course.title}</Link>
      </p>
      <h1><span className="muted">{unit.id}</span> {unit.title}</h1>

      <div className="card accent-blue">
        <strong>Objetivos de aprendizagem</strong>
        <ul>
          {unit.objectives.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </div>

      {me && !me.unlocked && (
        <div className="status warn">
          Esta unidade está bloqueada. Conclua a unidade anterior para liberá-la.
        </div>
      )}

      <article dangerouslySetInnerHTML={{ __html: renderContent(unit.contentHtml) }} />

      <h2>Avaliação</h2>

      {!enabled && (
        <div className="status warn">
          Firebase não configurado: a avaliação não pode ser registrada.
        </div>
      )}
      {enabled && !user && (
        <div className="status warn">Entre com o Google para responder e registrar a conclusão.</div>
      )}

      {alreadyDone && !result && <div className="status ok">Você já concluiu esta unidade.</div>}

      {result && (
        <div className={`status ${result.passed ? "ok" : "err"}`}>
          {result.passed
            ? `Aprovado: ${result.correct}/${result.total} corretas. Unidade registrada.`
            : `Ainda não: ${result.correct}/${result.total} corretas. Revise o conteúdo e tente novamente.`}
        </div>
      )}
      {error && <div className="status err">{error}</div>}

      {enabled && user && !alreadyDone && (
        <form onSubmit={submit}>
          {unit.quiz.map((q) => (
            <div className="field" key={q.id}>
              <div><strong>{q.question}</strong></div>
              {q.options.map((opt, i) => (
                <label className="opt" key={i}>
                  <input
                    type="radio"
                    name={q.id}
                    value={i}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button disabled={busy || Object.keys(answers).length < unit.quiz.length}>
            {busy ? "Enviando…" : "Enviar respostas"}
          </button>
        </form>
      )}

      {(result?.passed || alreadyDone) && (
        <div className="card accent-green">
          {next ? (
            <Link href={`/curso/${course.slug}/${next.slug}`}><button>Próxima unidade →</button></Link>
          ) : (
            <Link href={`/curso/${course.slug}/certificado`}><button>Emitir certificado</button></Link>
          )}
        </div>
      )}
    </>
  );
}
