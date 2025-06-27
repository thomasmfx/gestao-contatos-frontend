export interface Contato {
  id: number;
  clienteId: number;
  tipo: string;
  valor: string;
  observacao: string;
}

export type ContatoPayload = Contato;
export type ContatoUpdatePayload = Omit<Contato, "id">