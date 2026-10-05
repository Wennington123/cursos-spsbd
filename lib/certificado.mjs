// Um certificado já emitido só pode ser reaproveitado se tiver todos os dados
// que o documento exige. Registros criados antes da inclusão de CPF, conteúdo
// programático, período e identificação de quem certifica ficam incompletos:
// nesse caso o titular precisa emitir de novo, para sair um certificado válido.
export function certificadoCompleto(doc) {
  return Boolean(
    doc &&
      doc.cpf &&
      Array.isArray(doc.ementa) &&
      doc.ementa.length > 0 &&
      doc.periodoFim &&
      doc.emissor?.nome
  );
}
