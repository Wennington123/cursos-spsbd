"use client";

import Link from "next/link";
import { useState } from "react";
import { course } from "../../lib/courses.mjs";
import { answerKey } from "../../lib/answers.mjs";
import { gradeUnit, completedUnitIds, unitStates } from "../../lib/course-logic.mjs";
import { firebaseEnabled, saveUnitCompletion } from "../../lib/firebaseClient.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";

export default function UnitView({ unit }) {
  const { user, enabled } = useAuth();
  const progress = useProgress(user);
  const completed = completedUnitIds(progress);
  const states = unitStates(course.units, completed);
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
      const graded = gradeUnit(unit, answers, answerKey);
      if (graded.passed) await saveUnitCompletion(user, unit.id, graded.score);
      setResult(graded);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="muted"><Link href="/">← Voltar ao curso</Link></p>
      <h1><span className="muted">{unit.id}</span> {unit.title}</h1>

      <div className="card">
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

      <article dangerouslySetInnerHTML={{ __html: unit.contentHtml }} />

      <h2>Avaliação</h2>

      {!enabled && (
        <div className="status warn">
          Firebase não configurado: a avaliação não pode ser registrada. Defina as variáveis
          <code> NEXT_PUBLIC_FIREBASE_* </code> para habilitar login e progresso.
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
        <div className="card">
          {next ? (
            <Link href={`/unidade/${next.slug}`}><button>Próxima unidade →</button></Link>
          ) : (
            <Link href="/certificado"><button>Emitir certificado</button></Link>
          )}
        </div>
      )}
    </>
  );
}
