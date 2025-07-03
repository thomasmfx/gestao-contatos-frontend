import type { ID } from './ID';

export interface Endereco {
  id: ID;
  rua: string;
  numero?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  clienteId: number;
}

export type EnderecoPayload = Omit<Endereco, 'id' | 'clienteId'>;
