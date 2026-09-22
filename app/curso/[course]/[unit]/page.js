import { notFound } from "next/navigation";
import { courses, getCourse, findUnit, courseMeta } from "../../../../lib/courses.mjs";
import UnitView from "../../../components/UnitView";

export function generateStaticParams() {
  return courses.flatMap((c) => c.units.map((u) => ({ course: c.slug, unit: u.slug })));
}

export default async function Page({ params }) {
  const { course, unit } = await params;
  const data = getCourse(course);
  const found = findUnit(data, unit);
  if (!found) notFound();

  return (
    <UnitView
      course={{ ...courseMeta(data), answers: data.answers }}
      unit={{
        id: found.id,
        slug: found.slug,
        title: found.title,
        objectives: found.objectives,
        contentHtml: found.contentHtml,
        quiz: found.quiz,
      }}
    />
  );
}
