export function formatarDocumento(numero) {
  // Remove tudo que não for dígito (caso tenha algo além de números)
  const digitos = numero.replace(/\D/g, '');

  // Verifica se é CPF (11 dígitos)
  if (digitos.length === 11) {
    return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  // Verifica se é CNPJ (14 dígitos)
  else if (digitos.length === 14) {
    return digitos.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  // Retorna o número original se não for CPF nem CNPJ
  return numero;
}

export function formatarData(dataString) {
  // Quebra a data em partes [ano, mês, dia]
  const [ano, mes, dia] = dataString.split('-');

  // Retorna no formato dd/MM/aaaa
  return `${dia}/${mes}/${ano}`;
}
