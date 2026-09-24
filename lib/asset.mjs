export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path) {
  return `${basePath}${path}`;
}

// Substitui o marcador {{media}} pelo caminho correto de public/midia,
// respeitando o basePath (ex.: /cursos-spsbd). Use no conteúdo das unidades:
//   <img src="{{media}}/curso-1/segurancas.webp" alt="..." />
export function renderContent(html) {
  return String(html).replaceAll("{{media}}", asset("/midia"));
}
