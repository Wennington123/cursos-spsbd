export const PASS_THRESHOLD = 0.6;

export function unitKey(courseSlug, unitId) {
  return `${courseSlug}/${unitId}`;
}

export function gradeUnit(unit, courseAnswers, submitted) {
  const key = (courseAnswers || {})[unit.id] || {};
  const total = unit.quiz.length;
  if (total === 0) return { correct: 0, total: 0, score: 0, passed: false };

  let correct = 0;
  for (const q of unit.quiz) {
    if (Number(submitted?.[q.id]) === key[q.id]) correct += 1;
  }
  const score = correct / total;
  return { correct, total, score, passed: score >= PASS_THRESHOLD };
}

export function completedKeys(progress) {
  const units = progress?.units || {};
  return Object.keys(units).filter((k) => units[k]?.completed === true);
}

export function completedUnitIds(progress, courseSlug) {
  const prefix = `${courseSlug}/`;
  return completedKeys(progress)
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.slice(prefix.length));
}

export function unitStates(units, completed) {
  const set = completed instanceof Set ? completed : new Set(completed);
  return units.map((u, i) => {
    const done = set.has(u.id);
    const unlocked = i === 0 || set.has(units[i - 1].id);
    return { id: u.id, slug: u.slug, title: u.title, completed: done, unlocked };
  });
}

export function isCourseComplete(units, completed) {
  const set = completed instanceof Set ? completed : new Set(completed);
  return units.length > 0 && units.every((u) => set.has(u.id));
}

export function courseStats(course, progress) {
  const completed = completedUnitIds(progress, course.slug);
  return {
    completed,
    count: completed.length,
    total: course.units.length,
    complete: isCourseComplete(course.units, completed),
  };
}
