export interface Endereco {
  id: number;
  rua: string;
  numero?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  clienteId: number;
}

export type EnderecoPayload = Omit<Endereco, 'id' | 'clienteId'>;
