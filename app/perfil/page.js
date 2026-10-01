import { courses, courseMeta } from "../../lib/courses.mjs";
import PerfilView from "../components/PerfilView";

export const metadata = { title: "Meu perfil — Cursos SPSBD-GC" };

export default function Page() {
  return <PerfilView catalogo={courses.map(courseMeta)} />;
}
