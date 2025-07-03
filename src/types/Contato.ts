import type { ID } from './ID';

export interface Contato {
  id: ID;
  clienteId: number | string;
  tipo: string;
  valor: string;
  observacao: string;
}

export type ContatoPayload = Omit<Contato, 'id'>;
export type ContatoUpdatePayload = Omit<Contato, 'id'>;
