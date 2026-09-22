import { notFound } from "next/navigation";
import { courses, getCourse, courseMeta } from "../../../lib/courses.mjs";
import CourseHome from "../../components/CourseHome";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export default async function Page({ params }) {
  const { course } = await params;
  const data = getCourse(course);
  if (!data) notFound();
  return <CourseHome course={courseMeta(data)} />;
}
