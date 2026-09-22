import { notFound } from "next/navigation";
import { course } from "../../../lib/courses.mjs";
import UnitView from "../../components/UnitView";

export function generateStaticParams() {
  return course.units.map((u) => ({ slug: u.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const unit = course.units.find((u) => u.slug === slug);
  if (!unit) notFound();
  return <UnitView unit={unit} />;
}
