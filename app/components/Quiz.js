"use client";

import { useState } from "react";
import { LETRAS } from "../../lib/course-logic.mjs";

// Avaliação em lista única: a questão e as suas alternativas aparecem uma vez
// só. Antes de enviar, as alternativas são selecionáveis; depois de enviar (ou
// quando a avaliação já foi concluída), as mesmas alternativas passam a mostrar
// a resposta correta, a escolha do aluno e a explicação — sem repetir a questão.
//
// corrigir  — recebe as respostas e devolve { correct, total, score, passed }
// aoAprovar — chamado quando o resultado é aprovado, para registrar no servidor
export default function Quiz({ questoes, gabarito, jaConcluido, podeResponder = true, corrigir, aoAprovar }) {
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const respondidas = Object.keys(respostas).length;
  const emRevisao = Boolean(resultado) || jaConcluido;
  const podeMarcar = podeResponder && !jaConcluido;

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      const r = corrigir(respostas);
      if (r.passed && aoAprovar) await aoAprovar(r);
      setResultado(r);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar}>
      {jaConcluido && !resultado && <div className="status ok">Você já concluiu esta avaliação.</div>}

      {resultado && (
        <div className={`status ${resultado.passed ? "ok" : "err"}`}>
          {resultado.passed
            ? `Aprovado: ${resultado.correct} de ${resultado.total}. Registrado.`
            : `Ainda não: ${resultado.correct} de ${resultado.total}. Veja abaixo o que errou e tente novamente.`}
        </div>
      )}

      {erro && <div className="status err">{erro}</div>}

      {questoes.map((q, qi) => {
        const correta = gabarito[q.id];
        const marcada = respostas[q.id] === undefined ? null : Number(respostas[q.id]);
        const acertou = marcada !== null && marcada === correta;
        const estado = !emRevisao || marcada === null ? "" : acertou ? "questao-ok" : "questao-err";

        return (
          <div className={`field ${estado}`} key={q.id}>
            <div className="enunciado-form">
              {emRevisao && (
                <span className="marca" aria-hidden="true">
                  {marcada === null ? "•" : acertou ? "✓" : "✗"}{" "}
                </span>
              )}
              <strong>Questão {qi + 1}.</strong> {q.question}
            </div>

            {q.options.map((opt, i) => {
              const ehCorreta = emRevisao && i === correta;
              const foiMarcada = emRevisao && marcada !== null && i === marcada;
              const classe = `opt${ehCorreta ? " correta" : foiMarcada ? " marcada-errada" : ""}${
                podeMarcar ? "" : " opt-estatico"
              }`;

              const conteudo = (
                <>
                  {podeMarcar && (
                    <input
                      type="radio"
                      name={q.id}
                      value={i}
                      checked={respostas[q.id] === i}
                      onChange={() => setRespostas((a) => ({ ...a, [q.id]: i }))}
                    />
                  )}
                  <span className="opt-texto">
                    <span className="letra">{LETRAS[i]})</span> {opt}
                  </span>
                  {ehCorreta && <span className="etiqueta">correta</span>}
                  {foiMarcada && !ehCorreta && <span className="etiqueta">sua resposta</span>}
                </>
              );

              return podeMarcar ? (
                <label className={classe} key={i}>
                  {conteudo}
                </label>
              ) : (
                <div className={classe} key={i}>
                  {conteudo}
                </div>
              );
            })}

            {emRevisao && q.explanation && <p className="explicacao">{q.explanation}</p>}
          </div>
        );
      })}

      {podeMarcar && (
        <button disabled={enviando || respondidas < questoes.length}>
          {enviando ? "Enviando…" : resultado ? "Enviar novamente" : "Enviar respostas"}
        </button>
      )}
    </form>
  );
}
