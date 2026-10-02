import assert from "node:assert/strict";
import { courses } from "../lib/courses.mjs";
import {
  gradeUnit,
  gradeFinal,
  unitStates,
  isCourseComplete,
  completedUnitIds,
  courseStats,
  courseStates,
  unitKey,
  PASS_THRESHOLD,
} from "../lib/course-logic.mjs";
import { cnpjValido, cpfValido, formatarCPF, mascararCPF, nomeCompletoValido } from "../lib/documentos.mjs";
import { emissor, emissorConfigurado } from "../lib/emissor.mjs";

let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log("ok -", name);
}

const allUnits = courses.flatMap((c) => c.units.map((u) => ({ course: c, unit: u })));

// Progresso de um curso por inteiro: todas as unidades concluídas e a
// avaliação final aprovada.
function progressoCompleto(curso) {
  const units = {};
  for (const u of curso.units) units[unitKey(curso.slug, u.id)] = { completed: true };
  return { units, finals: { [curso.slug]: { approved: true, score: 1 } } };
}

test("ha 4 cursos com unidades", () => {
  assert.equal(courses.length, 4);
  for (const c of courses) {
    assert.ok(c.id && c.slug && c.title && c.subtitle && c.audience && c.workload, `curso incompleto: ${c.id}`);
    assert.ok(c.units.length > 0, `curso sem unidades: ${c.slug}`);
  }
});

test("slug de curso e unico", () => {
  const slugs = courses.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("id e slug de unidade sao unicos dentro do curso", () => {
  for (const c of courses) {
    const ids = c.units.map((u) => u.id);
    const slugs = c.units.map((u) => u.slug);
    assert.equal(new Set(ids).size, ids.length, `ids duplicados em ${c.slug}`);
    assert.equal(new Set(slugs).size, slugs.length, `slugs duplicados em ${c.slug}`);
  }
});

test("toda unidade tem objetivos, conteudo e 3 questoes de 4 alternativas", () => {
  for (const { course, unit } of allUnits) {
    const where = `${course.slug}/${unit.id}`;
    assert.ok(unit.title, `sem titulo: ${where}`);
    assert.ok(Array.isArray(unit.objectives) && unit.objectives.length >= 3, `objetivos: ${where}`);
    assert.ok(typeof unit.contentHtml === "string" && unit.contentHtml.length > 200, `conteudo: ${where}`);
    assert.equal(unit.quiz.length, 3, `quiz deveria ter 3 questoes: ${where}`);
    const qids = unit.quiz.map((q) => q.id);
    assert.deepEqual(qids, ["q1", "q2", "q3"], `ids de questao: ${where}`);
    for (const q of unit.quiz) {
      assert.equal(q.options.length, 4, `alternativas em ${where}/${q.id}`);
      assert.ok(q.question.endsWith("?") || q.question.length > 10, `enunciado em ${where}/${q.id}`);
    }
  }
});

test("gabarito cobre todas as unidades com indice valido", () => {
  for (const { course, unit } of allUnits) {
    const key = course.answers?.[unit.id];
    assert.ok(key, `sem gabarito: ${course.slug}/${unit.id}`);
    for (const q of unit.quiz) {
      const idx = key[q.id];
      assert.ok(Number.isInteger(idx), `indice ausente: ${course.slug}/${unit.id}/${q.id}`);
      assert.ok(idx >= 0 && idx < q.options.length, `indice invalido: ${course.slug}/${unit.id}/${q.id}`);
    }
  }
});

test("gabarito nao tem unidades sobrando", () => {
  for (const c of courses) {
    const ids = new Set(c.units.map((u) => u.id));
    for (const k of Object.keys(c.answers || {})) {
      assert.ok(ids.has(k), `gabarito orfao em ${c.slug}: ${k}`);
    }
  }
});

test("100% correto aprova e 0% reprova", () => {
  const { course, unit } = allUnits[0];
  const ok = gradeUnit(unit, course.answers, course.answers[unit.id]);
  assert.equal(ok.passed, true);
  assert.equal(ok.score, 1);

  const empty = gradeUnit(unit, course.answers, {});
  assert.equal(empty.passed, false);
  assert.equal(empty.correct, 0);
});

test("limite de aprovacao e aplicado", () => {
  const { course, unit } = allUnits[0];
  const answers = { ...course.answers[unit.id] };
  const first = unit.quiz[0];
  answers[first.id] = (course.answers[unit.id][first.id] + 1) % first.options.length;
  const r = gradeUnit(unit, course.answers, answers);
  assert.equal(r.correct, unit.quiz.length - 1);
  assert.equal(r.passed, (unit.quiz.length - 1) / unit.quiz.length >= PASS_THRESHOLD);
});

test("progresso e isolado por curso (chave com prefixo)", () => {
  const course = courses[0];
  const other = courses[1];
  const progress = { units: { [unitKey(course.slug, course.units[0].id)]: { completed: true } } };
  assert.deepEqual(completedUnitIds(progress, course.slug), [course.units[0].id]);
  assert.deepEqual(completedUnitIds(progress, other.slug), []);
});

test("unidade marcada como nao concluida nao conta", () => {
  const course = courses[0];
  const progress = { units: { [unitKey(course.slug, course.units[0].id)]: { completed: false } } };
  assert.deepEqual(completedUnitIds(progress, course.slug), []);
});

test("primeira unidade liberada, seguintes bloqueadas sem conclusao", () => {
  const s = unitStates(courses[0].units, []);
  assert.equal(s[0].unlocked, true);
  for (let i = 1; i < s.length; i++) assert.equal(s[i].unlocked, false);
});

test("concluir a anterior libera a seguinte", () => {
  const c = courses[0];
  const s = unitStates(c.units, [c.units[0].id]);
  assert.equal(s[0].completed, true);
  assert.equal(s[1].unlocked, true);
  if (s[2]) assert.equal(s[2].unlocked, false);
});

test("conclusao exige todas as unidades do curso", () => {
  const c = courses[0];
  const partial = { units: { [unitKey(c.slug, c.units[0].id)]: { completed: true } } };
  assert.equal(courseStats(c, partial).complete, false);

  const progresso = progressoCompleto(c);
  const st = courseStats(c, progresso);
  assert.equal(st.count, c.units.length);
  assert.equal(st.unitsComplete, true);
  assert.equal(st.finalApproved, true);
  assert.equal(st.complete, true);
  assert.equal(isCourseComplete(c.units, st.completed), true);
});

test("progresso de um curso nao conclui outro", () => {
  const c0 = courses[0];
  const c1 = courses[1];
  const progress = progressoCompleto(c0);
  assert.equal(courseStats(c0, progress).complete, true);
  assert.equal(courseStats(c1, progress).complete, false);
});

test("toda questao tem explicacao no gabarito", () => {
  const faltando = [];
  for (const { course, unit } of allUnits) {
    for (const q of unit.quiz) {
      if (typeof q.explanation !== "string" || q.explanation.trim().length < 15) {
        faltando.push(`${course.slug}/${unit.id}/${q.id}`);
      }
    }
  }
  assert.deepEqual(faltando, [], "questoes sem explicacao: " + faltando.join(", "));
});

test("sem progresso, so o primeiro curso fica liberado", () => {
  const estados = courseStates(courses, { units: {} });
  assert.equal(estados.length, courses.length);
  assert.equal(estados[0].unlocked, true);
  for (let i = 1; i < estados.length; i++) assert.equal(estados[i].unlocked, false);
});

test("concluir um curso libera o seguinte, e so ele", () => {
  const progress = progressoCompleto(courses[0]);

  const estados = courseStates(courses, progress);
  assert.equal(estados[0].complete, true);
  assert.equal(estados[1].unlocked, true);
  if (estados[2]) assert.equal(estados[2].unlocked, false);
});

test("curso parcialmente concluido nao libera o seguinte", () => {
  const progress = { units: {} };
  const unidades = courses[0].units;
  for (const u of unidades.slice(0, unidades.length - 1)) {
    progress.units[unitKey(courses[0].slug, u.id)] = { completed: true };
  }

  const estados = courseStates(courses, progress);
  assert.equal(estados[0].complete, false);
  assert.equal(estados[1].unlocked, false);
});

test("progresso de um curso nao abre os demais em cascata", () => {
  const progress = progressoCompleto(courses[1]);

  const estados = courseStates(courses, progress);
  assert.equal(estados[1].complete, true);
  assert.equal(estados[0].unlocked, true);
  assert.equal(estados[2].unlocked, false);
});

test("total de unidades do programa", () => {
  console.log(`\n  cursos: ${courses.length} | unidades: ${allUnits.length}`);
  for (const c of courses) console.log(`   ${c.id} ${c.slug}: ${c.units.length} unidades`);
  assert.ok(allUnits.length >= 20);
});

// ---------- Certificado: documentos, emissor e carga horária ----------

test("todo curso declara carga horaria formal em horas", () => {
  for (const c of courses) {
    assert.ok(/^\d+\s*hora(s)?$/.test(c.cargaHoraria), `carga horaria invalida em ${c.slug}: ${c.cargaHoraria}`);
    assert.ok(!c.cargaHoraria.includes("~"), `carga horaria com estimativa em ${c.slug}`);
  }
});

test("CPF: aceita validos e recusa invalidos", () => {
  assert.equal(cpfValido("529.982.247-25"), true);
  assert.equal(cpfValido("52998224725"), true);
  assert.equal(cpfValido("111.111.111-11"), false);
  assert.equal(cpfValido("529.982.247-26"), false);
  assert.equal(cpfValido("123"), false);
  assert.equal(cpfValido(""), false);
});

test("CPF: formata e mascara para exibicao publica", () => {
  assert.equal(formatarCPF("52998224725"), "529.982.247-25");
  assert.equal(mascararCPF("52998224725"), "529.***.***-25");
  assert.equal(mascararCPF("123"), "—");
});

test("CNPJ: aceita valido e recusa invalido", () => {
  assert.equal(cnpjValido("10.358.190/0001-77"), true);
  assert.equal(cnpjValido("10.358.190/0001-78"), false);
  assert.equal(cnpjValido("11111111111111"), false);
});

test("nome completo exige ao menos duas palavras", () => {
  assert.equal(nomeCompletoValido("Maria da Silva Santos"), true);
  assert.equal(nomeCompletoValido("Wennington Dias Aquino"), true);
  assert.equal(nomeCompletoValido("Maria"), false);
  assert.equal(nomeCompletoValido("  "), false);
});

test("quem certifica esta identificado por nome e funcao", () => {
  assert.equal(emissorConfigurado(), true, "identificacao incompleta em lib/emissor.mjs");
  assert.ok(emissor.nome.length > 5);
  assert.ok(emissor.cargo.length > 5);
  assert.ok(emissor.vinculo.length > 5);
  assert.ok(!/cnpj|\bcpf\b/i.test(emissor.nome + emissor.cargo), "quem certifica nao exibe CNPJ nem CPF");
});

test("ementa e gerada com todas as unidades do curso", () => {
  for (const c of courses) {
    const ementa = c.units.map((u) => `${u.id} — ${u.title}`);
    assert.equal(ementa.length, c.units.length);
    for (const item of ementa) assert.ok(item.includes("—") && item.length > 8, item);
  }
});

// ---------- Avaliação final de cada curso ----------

test("cada curso tem avaliacao final com 10 questoes de 4 alternativas", () => {
  for (const c of courses) {
    const ex = c.finalExam;
    assert.ok(ex, `curso sem avaliacao final: ${c.slug}`);
    assert.equal(ex.questions.length, 10, `questoes da final em ${c.slug}`);

    const ids = ex.questions.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length, `ids duplicados na final de ${c.slug}`);

    for (const q of ex.questions) {
      assert.equal(q.options.length, 4, `alternativas em ${c.slug}/${q.id}`);
      assert.ok(typeof q.explanation === "string" && q.explanation.trim().length >= 15, `explicacao em ${c.slug}/${q.id}`);
      const idx = ex.answers[q.id];
      assert.ok(Number.isInteger(idx), `gabarito ausente em ${c.slug}/${q.id}`);
      assert.ok(idx >= 0 && idx < q.options.length, `indice invalido em ${c.slug}/${q.id}`);
    }

    for (const k of Object.keys(ex.answers)) {
      assert.ok(ids.includes(k), `gabarito orfao na final de ${c.slug}: ${k}`);
    }
  }
});

test("questoes da final nao repetem enunciados das unidades", () => {
  const dasUnidades = new Set(
    allUnits.flatMap(({ unit }) => unit.quiz.map((q) => q.question.trim().toLowerCase()))
  );
  const repetidas = [];
  for (const c of courses) {
    for (const q of c.finalExam.questions) {
      if (dasUnidades.has(q.question.trim().toLowerCase())) repetidas.push(`${c.slug}/${q.id}`);
    }
  }
  assert.deepEqual(repetidas, [], "enunciados repetidos: " + repetidas.join(", "));
});

test("aprovacao na final exige 60 por cento", () => {
  const ex = courses[0].finalExam;
  const certas = {};
  for (const q of ex.questions) certas[q.id] = ex.answers[q.id];

  assert.equal(gradeFinal(ex, certas).passed, true);
  assert.equal(gradeFinal(ex, certas).correct, 10);
  assert.equal(gradeFinal(ex, {}).passed, false);
  assert.equal(gradeFinal(ex, {}).correct, 0);

  const seis = { ...certas };
  for (const q of ex.questions.slice(6)) delete seis[q.id];
  assert.equal(gradeFinal(ex, seis).correct, 6);
  assert.equal(gradeFinal(ex, seis).passed, true);

  const cinco = { ...seis };
  delete cinco[ex.questions[5].id];
  assert.equal(gradeFinal(ex, cinco).passed, false);
});

test("conclusao do curso exige unidades e avaliacao final", () => {
  const c = courses[0];
  const progress = { units: {} };
  for (const u of c.units) progress.units[unitKey(c.slug, u.id)] = { completed: true };

  assert.equal(courseStats(c, progress).unitsComplete, true);
  assert.equal(courseStats(c, progress).finalApproved, false);
  assert.equal(courseStats(c, progress).complete, false);

  progress.finals = { [c.slug]: { approved: true, score: 0.9 } };
  assert.equal(courseStats(c, progress).finalApproved, true);
  assert.equal(courseStats(c, progress).complete, true);
});

test("curso seguinte so libera com a final do anterior aprovada", () => {
  const progress = { units: {} };
  for (const u of courses[0].units) progress.units[unitKey(courses[0].slug, u.id)] = { completed: true };

  const semFinal = courseStates(courses, progress);
  assert.equal(semFinal[0].unitsComplete, true);
  assert.equal(semFinal[0].complete, false);
  assert.equal(semFinal[1].unlocked, false);

  progress.finals = { [courses[0].slug]: { approved: true, score: 0.8 } };
  const comFinal = courseStates(courses, progress);
  assert.equal(comFinal[0].complete, true);
  assert.equal(comFinal[1].unlocked, true);
});

console.log(`\n${n} testes passaram.`);
