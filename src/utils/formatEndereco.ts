import type { Endereco } from '../types/Cliente';

export function getEnderecoRuaAndNumero(endereco: Endereco): string {
  const rua = endereco.rua;
  const numero = endereco.numero;

  if (!numero) return rua;

  return `${rua}, ${numero}`;
}
