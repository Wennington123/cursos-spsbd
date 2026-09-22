import assert from "node:assert/strict";
import { course } from "../lib/courses.mjs";
import { answerKey } from "../lib/answers.mjs";
import { gradeUnit, unitStates, isCourseComplete, completedUnitIds, PASS_THRESHOLD } from "../lib/course-logic.mjs";

let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log("ok -", name);
}

const u1 = course.units[0];
const u2 = course.units[1];

test("gabarito cobre todas as unidades e questões", () => {
  for (const u of course.units) {
    assert.ok(answerKey[u.id], `sem gabarito para ${u.id}`);
    for (const q of u.quiz) {
      assert.ok(Number.isInteger(answerKey[u.id][q.id]), `sem resposta para ${u.id}/${q.id}`);
      assert.ok(answerKey[u.id][q.id] >= 0 && answerKey[u.id][q.id] < q.options.length, `índice inválido em ${u.id}/${q.id}`);
    }
  }
});

test("quiz só do cliente não contém o gabarito", () => {
  const raw = JSON.stringify(course);
  assert.ok(!raw.includes("answerKey"), "course não pode expor gabarito");
  for (const u of course.units) {
    for (const q of u.quiz) {
      assert.deepEqual(Object.keys(q).sort(), ["id", "options", "question"]);
    }
  }
});

test("100% correto aprova", () => {
  const r = gradeUnit(u1, answerKey[u1.id], answerKey);
  assert.equal(r.passed, true);
  assert.equal(r.score, 1);
});

test("abaixo do limite reprova", () => {
  const wrong = {};
  for (const q of u1.quiz) wrong[q.id] = (answerKey[u1.id][q.id] + 1) % q.options.length;
  const r = gradeUnit(u1, wrong, answerKey);
  assert.equal(r.passed, false);
  assert.equal(r.correct, 0);
});

test("respostas vazias reprovam", () => {
  const r = gradeUnit(u1, {}, answerKey);
  assert.equal(r.correct, 0);
  assert.equal(r.passed, false);
});

test("limite de aprovação é aplicado", () => {
  const answers = { ...answerKey[u1.id] };
  answers[u1.quiz[0].id] = (answerKey[u1.id][u1.quiz[0].id] + 1) % u1.quiz[0].options.length;
  const r = gradeUnit(u1, answers, answerKey);
  assert.equal(r.correct, u1.quiz.length - 1);
  assert.equal(r.passed, (u1.quiz.length - 1) / u1.quiz.length >= PASS_THRESHOLD);
});

test("primeira unidade liberada, demais bloqueadas sem conclusão", () => {
  const s = unitStates(course.units, []);
  assert.equal(s[0].unlocked, true);
  assert.equal(s[1].unlocked, false);
  assert.equal(s[2].unlocked, false);
});

test("concluir a anterior libera a seguinte", () => {
  const s = unitStates(course.units, [u1.id]);
  assert.equal(s[0].completed, true);
  assert.equal(s[1].unlocked, true);
  assert.equal(s[2].unlocked, false);
});

test("progresso parcial não conclui o curso", () => {
  const c = completedUnitIds({ units: { [u1.id]: { completed: true } } });
  assert.deepEqual(c, [u1.id]);
  assert.equal(isCourseComplete(course.units, c), false);
});

test("todas as unidades concluídas fecham o curso", () => {
  const units = {};
  for (const u of course.units) units[u.id] = { completed: true };
  const c = completedUnitIds({ units });
  assert.equal(c.length, course.units.length);
  assert.equal(isCourseComplete(course.units, c), true);
});

test("unidade marcada como não concluída não conta", () => {
  const c = completedUnitIds({ units: { [u2.id]: { completed: false } } });
  assert.equal(c.length, 0);
});

console.log(`\n${n} testes passaram.`);
