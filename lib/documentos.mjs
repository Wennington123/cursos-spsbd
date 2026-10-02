// Validação e formatação de CPF e CNPJ, usados no certificado.
// Sem dependências: os dígitos verificadores são calculados aqui mesmo.

export function apenasDigitos(valor) {
  return String(valor ?? "").replace(/\D/g, "");
}

export function formatarCPF(valor) {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length !== 11) return d;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function formatarCNPJ(valor) {
  const d = apenasDigitos(valor).slice(0, 14);
  if (d.length !== 14) return d;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

// Mostra apenas o início e o fim: 123.***.***-45
export function mascararCPF(valor) {
  const d = apenasDigitos(valor);
  if (d.length !== 11) return "—";
  return `${d.slice(0, 3)}.***.***-${d.slice(9)}`;
}

function digitoVerificador(base, pesos) {
  let soma = 0;
  for (let i = 0; i < pesos.length; i += 1) soma += Number(base[i]) * pesos[i];
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function cpfValido(valor) {
  const cpf = apenasDigitos(valor);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const primeiro = digitoVerificador(cpf, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (primeiro !== Number(cpf[9])) return false;

  const segundo = digitoVerificador(cpf, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return segundo === Number(cpf[10]);
}

export function cnpjValido(valor) {
  const cnpj = apenasDigitos(valor);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const primeiro = digitoVerificador(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (primeiro !== Number(cnpj[12])) return false;

  const segundo = digitoVerificador(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return segundo === Number(cnpj[13]);
}

// Nome que pode constar em documento: precisa de ao menos duas palavras.
export function nomeCompletoValido(valor) {
  const nome = String(valor ?? "").trim().replace(/\s+/g, " ");
  if (nome.length < 5) return false;
  if (!/^[\p{L}\s'.-]+$/u.test(nome)) return false;
  return nome.split(" ").filter((p) => p.length >= 2).length >= 2;
}
