"use client";

import { useState } from "react";
import { LETRAS } from "../../lib/course-logic.mjs";

// Formulário e gabarito de uma avaliação. É usado tanto nas unidades quanto na
// avaliação final do curso, para que numeração, letras (a, b, c, d) e gabarito
// sejam idênticos nos dois casos.
//
// corrigir  — recebe as respostas e devolve { correct, total, score, passed }
// aoAprovar — chamado quando o resultado é aprovado, para registrar no servidor
export default function Quiz({ questoes, gabarito, jaConcluido, podeResponder = true, corrigir, aoAprovar }) {
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const respondidas = Object.keys(respostas).length;

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

  const mostrarGabarito = Boolean(resultado) || jaConcluido;

  return (
    <>
      {jaConcluido && !resultado && <div className="status ok">Você já concluiu esta avaliação.</div>}

      {resultado && (
        <div className={`status ${resultado.passed ? "ok" : "err"}`}>
          {resultado.passed
            ? `Aprovado: ${resultado.correct} de ${resultado.total}. Registrado. Veja o gabarito abaixo.`
            : `Ainda não: ${resultado.correct} de ${resultado.total}. Veja o gabarito abaixo e tente novamente.`}
        </div>
      )}
      {erro && <div className="status err">{erro}</div>}

      {mostrarGabarito && (
        <section className="gabarito">
          <h3>Gabarito</h3>
          {questoes.map((q, qi) => {
            const correta = gabarito[q.id];
            const marcada = respostas[q.id] === undefined ? null : Number(respostas[q.id]);
            const acertou = marcada === correta;
            return (
              <div className={`questao ${marcada === null ? "" : acertou ? "ok" : "err"}`} key={q.id}>
                <p className="enunciado">
                  <span className="marca" aria-hidden="true">
                    {marcada === null ? "•" : acertou ? "✓" : "✗"}
                  </span>{" "}
                  <strong>Questão {qi + 1}.</strong> {q.question}
                </p>
                <ul className="alternativas">
                  {q.options.map((opt, i) => {
                    const ehCorreta = i === correta;
                    const foiMarcada = marcada !== null && i === marcada;
                    const classe = ehCorreta ? "correta" : foiMarcada ? "marcada-errada" : "";
                    return (
                      <li className={classe} key={i}>
                        <span>
                          <span className="letra">{LETRAS[i]})</span> {opt}
                        </span>
                        {ehCorreta && <span className="etiqueta">correta</span>}
                        {foiMarcada && !ehCorreta && <span className="etiqueta">sua resposta</span>}
                      </li>
                    );
                  })}
                </ul>
                {q.explanation && <p className="explicacao">{q.explanation}</p>}
              </div>
            );
          })}
        </section>
      )}

      {podeResponder && !jaConcluido && (
        <form onSubmit={enviar}>
          {questoes.map((q, qi) => (
            <div className="field" key={q.id}>
              <div className="enunciado-form">
                <strong>Questão {qi + 1}.</strong> {q.question}
              </div>
              {q.options.map((opt, i) => (
                <label className="opt" key={i}>
                  <input
                    type="radio"
                    name={q.id}
                    value={i}
                    checked={respostas[q.id] === i}
                    onChange={() => setRespostas((a) => ({ ...a, [q.id]: i }))}
                  />
                  <span className="letra">{LETRAS[i]})</span> {opt}
                </label>
              ))}
            </div>
          ))}
          <button disabled={enviando || respondidas < questoes.length}>
            {enviando ? "Enviando…" : "Enviar respostas"}
          </button>
        </form>
      )}
    </>
  );
}
