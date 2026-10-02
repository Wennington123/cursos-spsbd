// ---------------------------------------------------------------------------
// Quem emite o certificado: o técnico responsável, identificado por nome e
// função. Sem CNPJ e sem CPF do emissor — as logos no certificado indicam o
// serviço e a rede em que o técnico atua, não um órgão emissor.
//
// A validação abaixo existe só para que nenhum certificado saia sem a
// identificação de quem certifica.
// ---------------------------------------------------------------------------

export const emissor = {
  nome: "Wennington Dias Aquino",
  cargo: "Técnico de Referência do SPSBD-GC",
  vinculo:
    "SPSBD-GC — Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos",
  cidade: "Petrolina — PE",
};

export function emissorConfigurado() {
  const nome = String(emissor.nome || "").trim();
  const cargo = String(emissor.cargo || "").trim();
  return nome.length >= 5 && cargo.length >= 5;
}
