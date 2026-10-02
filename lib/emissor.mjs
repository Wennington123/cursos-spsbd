import { apenasDigitos, cnpjValido, cpfValido, formatarCNPJ, formatarCPF } from "./documentos.mjs";

// ---------------------------------------------------------------------------
// Quem emite o certificado. ESTES CAMPOS PRECISAM SER PREENCHIDOS antes de
// emitir: o certificado só é gerado quando o emissor e o documento estiverem
// válidos, para não produzir um documento incompleto.
//
// Três caminhos possíveis, todos de sua decisão:
//
//   1. MEI / pessoa jurídica própria
//      nome: "Wennington Dias Aquino" (ou nome fantasia)
//      cnpj: "00.000.000/0000-00"
//      → permite emitir de forma autônoma, declarando-se como instituição.
//
//   2. Pessoa física (profissional autônomo)
//      nome: "Wennington Dias Aquino"
//      cpfResponsavel: "000.000.000-00"   // sem CNPJ
//      → cursos livres podem ser ofertados por pessoa física; o documento
//        exibido passa a ser o CPF do responsável.
//
//   3. Órgão público (Secretaria / Prefeitura)
//      nome: "Prefeitura de Petrolina — Secretaria de Assistência Social"
//      cnpj: "00.000.000/0000-00"
//      → somente com autorização formal do órgão. Sem ela, usar o CNPJ
//        público daria ao certificado um endosso institucional que não existe.
// ---------------------------------------------------------------------------

export const emissor = {
  nome: "Prefeitura de Petrolina — Secretaria de Assistência Social e Combate à Fome",
  cnpj: "10.358.190/0001-77",
  cpfResponsavel: "",
  cidade: "Petrolina — PE",
  responsavel: {
    nome: "Wennington Dias Aquino",
    cargo: "Técnico de Referência do SPSBD-GC",
  },
};

export function documentoDoEmissor() {
  if (apenasDigitos(emissor.cnpj).length) {
    return { tipo: "CNPJ", valor: formatarCNPJ(emissor.cnpj) };
  }
  if (apenasDigitos(emissor.cpfResponsavel).length) {
    return { tipo: "CPF do responsável", valor: formatarCPF(emissor.cpfResponsavel) };
  }
  return null;
}

export function emissorConfigurado() {
  const nome = String(emissor.nome || "").trim();
  if (nome.length < 3) return false;

  const cnpj = apenasDigitos(emissor.cnpj);
  if (cnpj.length) return cnpjValido(cnpj);

  const cpf = apenasDigitos(emissor.cpfResponsavel);
  return cpf.length ? cpfValido(cpf) : false;
}
