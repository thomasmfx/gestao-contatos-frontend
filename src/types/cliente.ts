export interface Endereco {
  id: number;
  rua: string;
  numero?: string;
  cidade?: string;
  cep?: string;
  clienteId: number;
} 

export interface Cliente {
  id: number
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco?: Endereco
}

type EnderecoPayload = Omit<Endereco, "id" | "clienteId">;

export type ClientePayload = Omit<Cliente, "id" | "endereco"> & {
  endereco?: EnderecoPayload
};

export type ClienteUpdatePayload = Partial<ClientePayload>