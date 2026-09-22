import { course } from "../lib/courses.mjs";
import CourseHome from "./components/CourseHome";

export default function Page() {
  return <CourseHome course={course} />;
}
