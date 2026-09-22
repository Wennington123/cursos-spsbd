import assert from "node:assert/strict";
import { courses } from "../lib/courses.mjs";
import {
  gradeUnit,
  unitStates,
  isCourseComplete,
  completedUnitIds,
  courseStats,
  unitKey,
  PASS_THRESHOLD,
} from "../lib/course-logic.mjs";

let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log("ok -", name);
}

const allUnits = courses.flatMap((c) => c.units.map((u) => ({ course: c, unit: u })));

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

  const full = { units: {} };
  for (const u of c.units) full.units[unitKey(c.slug, u.id)] = { completed: true };
  const st = courseStats(c, full);
  assert.equal(st.count, c.units.length);
  assert.equal(st.complete, true);
  assert.equal(isCourseComplete(c.units, st.completed), true);
});

test("progresso de um curso nao conclui outro", () => {
  const c0 = courses[0];
  const c1 = courses[1];
  const progress = { units: {} };
  for (const u of c0.units) progress.units[unitKey(c0.slug, u.id)] = { completed: true };
  assert.equal(courseStats(c0, progress).complete, true);
  assert.equal(courseStats(c1, progress).complete, false);
});

test("total de unidades do programa", () => {
  console.log(`\n  cursos: ${courses.length} | unidades: ${allUnits.length}`);
  for (const c of courses) console.log(`   ${c.id} ${c.slug}: ${c.units.length} unidades`);
  assert.ok(allUnits.length >= 20);
});

console.log(`\n${n} testes passaram.`);
