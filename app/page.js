import { courses, courseMeta } from "../lib/courses.mjs";
import CourseCatalog from "./components/CourseCatalog";

export default function Page() {
  return <CourseCatalog courses={courses.map(courseMeta)} />;
}
