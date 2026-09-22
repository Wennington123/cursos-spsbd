export const PASS_THRESHOLD = 0.6;

export function gradeUnit(unit, answers, answerKey) {
  const key = answerKey[unit.id] || {};
  const total = unit.quiz.length;
  if (total === 0) return { correct: 0, total: 0, score: 0, passed: false };

  let correct = 0;
  for (const q of unit.quiz) {
    if (Number(answers?.[q.id]) === key[q.id]) correct += 1;
  }
  const score = correct / total;
  return { correct, total, score, passed: score >= PASS_THRESHOLD };
}

export function completedUnitIds(progress) {
  const units = progress?.units || {};
  return Object.keys(units).filter((id) => units[id]?.completed === true);
}

export function isCourseComplete(units, completed) {
  const set = completed instanceof Set ? completed : new Set(completed);
  return units.every((u) => set.has(u.id));
}

export function unitStates(units, completed) {
  const set = completed instanceof Set ? completed : new Set(completed);
  return units.map((u, i) => {
    const done = set.has(u.id);
    const unlocked = i === 0 || set.has(units[i - 1].id);
    return { id: u.id, slug: u.slug, title: u.title, completed: done, unlocked };
  });
}
