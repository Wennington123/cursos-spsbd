"use client";

import Link from "next/link";
import { PASS_THRESHOLD, courseStats, gradeFinal } from "../../lib/course-logic.mjs";
import { saveFinalResult } from "../../lib/firebaseClient.mjs";
import { useAuth } from "./useAuth";
import { useProgress } from "./useProgress";
import Quiz from "./Quiz";

export default function FinalExamView({ course }) {
  const { user, enabled } = useAuth();
  const { progress, erro: erroProgresso } = useProgress(user);
  const st = courseStats(course, progress);

  const questoes = course.finalExam?.questions || [];
  const minimo = Math.ceil(PASS_THRESHOLD * questoes.length);
  const aprovado = st.finalApproved;
  const liberada = st.unitsComplete;

  return (
    <>
      <p className="muted">
        <Link href="/">Cursos</Link> · <Link href={`/curso/${course.slug}`}>{course.title}</Link>
      </p>
      <h1>Avaliação final</h1>
      <p className="lede">
        {questoes.length} questões sobre o conjunto do curso <strong>{course.title}</strong>, com quatro
        alternativas cada. São necessários {minimo} acertos para a aprovação.
      </p>

      {!liberada && (
        <div className="status warn">
          Conclua todas as unidades para liberar a avaliação final ({st.count}/{st.total} concluídas).
        </div>
      )}

      {enabled && !user && (
        <div className="status warn">Entre com o Google para responder e registrar o resultado.</div>
      )}

      {erroProgresso && (
        <div className="status err">Não foi possível ler seu progresso no servidor: {erroProgresso}</div>
      )}

      {aprovado && (
        <div className="status ok">
          Você já foi aprovado nesta avaliação
          {st.finalScore !== null ? ` (${Math.round(st.finalScore * questoes.length)} de ${questoes.length})` : ""}.
        </div>
      )}

      {liberada && enabled && user && (
        <Quiz
          questoes={questoes}
          gabarito={course.finalExam.answers}
          jaConcluido={aprovado}
          corrigir={(respostas) => gradeFinal(course.finalExam, respostas)}
          aoAprovar={(r) => saveFinalResult(user, course.slug, r)}
        />
      )}

      {aprovado && (
        <div className="card accent-green">
          <strong>Curso concluído.</strong>
          <p className="muted" style={{ margin: "4px 0 10px" }}>
            Você concluiu as unidades e foi aprovado na avaliação final. O certificado já pode ser emitido.
          </p>
          <Link href={`/curso/${course.slug}/certificado`}>
            <button>Emitir certificado</button>
          </Link>
        </div>
      )}

      <p className="muted" style={{ marginTop: 24, fontSize: ".88rem" }}>
        <Link href={`/curso/${course.slug}`}>← Voltar ao curso</Link>
      </p>
    </>
  );
}
