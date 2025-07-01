import type { Endereco, EnderecoPayload } from './Endereco';
import type { ID } from './ID';

export interface Cliente {
  id: ID;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
}

export type ClientePayload = Omit<Cliente, 'id' | 'endereco'> & {
  endereco: EnderecoPayload;
};

export type ClienteUpdatePayload = Partial<ClientePayload>;
