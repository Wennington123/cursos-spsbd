export const PASS_THRESHOLD = 0.6;

// Letras das alternativas, na ordem em que aparecem na avaliação.
export const LETRAS = ["a", "b", "c", "d"];

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

// Avaliação geral do curso, ao final de todas as unidades.
export function gradeFinal(exam, submitted) {
  const total = exam?.questions?.length || 0;
  if (total === 0) return { correct: 0, total: 0, score: 0, passed: false };

  let correct = 0;
  for (const q of exam.questions) {
    if (Number(submitted?.[q.id]) === exam.answers?.[q.id]) correct += 1;
  }
  const score = correct / total;
  return { correct, total, score, passed: score >= PASS_THRESHOLD };
}

// O resultado da avaliação geral fica em progress.finals, separado das unidades
// para não ser confundido com a conclusão de uma unidade.
export function isFinalApproved(progress, courseSlug) {
  return progress?.finals?.[courseSlug]?.approved === true;
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
  const unitsComplete = isCourseComplete(course.units, completed);
  const finalApproved = isFinalApproved(progress, course.slug);
  return {
    completed,
    count: completed.length,
    total: course.units.length,
    unitsComplete,
    finalApproved,
    finalScore: progress?.finals?.[course.slug]?.score ?? null,
    // O curso só está concluído com as unidades feitas E a avaliação geral aprovada.
    complete: unitsComplete && finalApproved,
  };
}

// Os cursos liberam em sequência: o primeiro é livre e cada um seguinte
// só abre quando o anterior é concluído por inteiro.
export function courseStates(courses, progress) {
  const estados = [];
  let anteriorConcluido = true;
  for (const curso of courses) {
    const st = courseStats(curso, progress);
    estados.push({
      id: curso.id,
      slug: curso.slug,
      title: curso.title,
      subtitle: curso.subtitle,
      audience: curso.audience,
      workload: curso.workload,
      count: st.count,
      total: st.total,
      unitsComplete: st.unitsComplete,
      finalApproved: st.finalApproved,
      complete: st.complete,
      unlocked: anteriorConcluido,
    });
    anteriorConcluido = anteriorConcluido && st.complete;
  }
  return estados;
}
