import type { Endereco, EnderecoPayload } from './Endereco';

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
}

export type ClientePayload = Omit<Cliente, 'id' | 'endereco'> & {
  endereco: EnderecoPayload;
};

export type ClienteUpdatePayload = Partial<ClientePayload>;
