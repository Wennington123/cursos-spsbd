import { curso1 } from "./courses/curso-1.mjs";
import { curso2 } from "./courses/curso-2.mjs";
import { curso3 } from "./courses/curso-3.mjs";
import { curso4 } from "./courses/curso-4.mjs";

export const courses = [curso1, curso2, curso3, curso4];

export function getCourse(slug) {
  return courses.find((c) => c.slug === slug) || null;
}

export function findUnit(course, unitSlug) {
  if (!course) return null;
  return course.units.find((u) => u.slug === unitSlug) || null;
}

// Versão enxuta para enviar ao cliente: sem conteudo nem gabarito.
// Evita serializar o texto das unidades em páginas que não os exibem.
export function courseMeta(course) {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    audience: course.audience,
    workload: course.workload,
    units: course.units.map((u) => ({ id: u.id, slug: u.slug, title: u.title })),
  };
}
