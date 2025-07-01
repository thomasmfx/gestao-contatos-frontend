import { useState } from 'react';
import { isError } from '../utils/isError';
import { Contato, ContatoPayload, ContatoUpdatePayload } from '../types/contato'
import API_URL from '../utils/API';
import { ID } from '../types/id';

interface UseContatosResult {
  contatosData: Contato[] | [];
  contatosLoading: boolean;
  contatosError: string | null;
  setContatos: (clienteId?: ID) => Promise<Contato[] | null>;
  getContatos: (clienteId: ID) => Promise<Contato[] | null>;
  getSingleContato: (id: ID) => Promise<Contato | null>;
  addContato: (data: ContatoPayload) => Promise<Contato>;
  updateContato: (id: ID, newData: ContatoUpdatePayload) => Promise<Contato | null>;
  deleteContato: (id: ID) => Promise<boolean>;
}

function useContatos(): UseContatosResult {
  const [contatosData, setContatosData] = useState<Contato[] | []>([]);
  const [contatosLoading, setContatosLoading] = useState<boolean>(false);
  const [contatosError, setContatosError] = useState<string | null>(null);

  const baseUrl = `${API_URL}/contatos`;

  async function setContatos(clienteId?: ID): Promise<Contato[] | null> {
    setContatosLoading(true);
    setContatosError(null);

    try {
      const url = clienteId ? `${baseUrl}?clienteid=${clienteId}` : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      setContatosData(result);
      return result;
    } catch (err) {
      const errorMessage = "Ocorreu um erro inesperado";

      if (isError(err)) {
        setContatosError(errorMessage);
      }

      return null;
    } finally {
      setContatosLoading(false);
    }
  }

  async function getContatos(clienteId?: ID): Promise<Contato[] | null> {
    try {
      const url = `${baseUrl}?clienteid=${clienteId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";

      if (isError(err)) {
        setContatosError(errorMessage);
      }

      return null;
    }
  }

  async function getSingleContato(id: ID): Promise<Contato | null> {
    try {
      const url = `${baseUrl}/${id}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";

      if (isError(err)) {
        setContatosError(errorMessage);
      }

      return null;
    }
  }

  async function addContato(data: ContatoPayload): Promise<Contato> {
    const url = baseUrl;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    return result;

  }

  async function updateContato(id: ID, newData: ContatoUpdatePayload): Promise<Contato | null> {
    try {
      const url = `${baseUrl}/${id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";

      if (isError(err)) {
        setContatosError(errorMessage);
      }

      return null;
    }
  }

  async function deleteContato(id: ID): Promise<boolean> {
    try {
      const url = `${baseUrl}/${id}`;

      const response = await fetch(url, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Erro ao deletar: ${response.status}`);
      }

      return response.ok;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";

      if (isError(err)) {
        setContatosError(errorMessage);
      }

      return false;
    }
  }

  return {
    contatosData,
    contatosLoading,
    contatosError,
    setContatos,
    getContatos,
    getSingleContato,
    addContato,
    updateContato,
    deleteContato,
  };
}

export default useContatos;
