import { ref, type Ref } from 'vue';

import type {
  Contato,
  ContatoPayload,
  ContatoUpdatePayload,
} from '../types/Contato';

import { isError } from '../utils/isError';
import API_URL from '../utils/API';

interface UseContatosResult {
  contatosData: Ref<Contato[] | []>;
  contatosLoading: Ref<boolean>;
  contatosError: Ref<string | null>;
  setContatos: (clienteId?: number) => Promise<Contato[] | null>;
  getContatos: (clienteId: number) => Promise<Contato[] | null>;
  getSingleContato: (id: number) => Promise<Contato | null>;
  addContato: (data: ContatoPayload) => Promise<Contato>;
  updateContato: (
    id: number,
    newData: ContatoUpdatePayload,
  ) => Promise<Contato | null>;
  deleteContato: (id: number) => Promise<boolean>;
}

export function useContatos(): UseContatosResult {
  const contatosData = ref<Contato[]>([]);
  const contatosLoading = ref<boolean>(false);
  const contatosError = ref<string | null>(null);

  const baseUrl = `${API_URL}/contatos`;

  const setContatos = async (clienteId?: number): Promise<Contato[] | null> => {
    contatosLoading.value = true;
    try {
      const url = clienteId ? `${baseUrl}?clienteid=${clienteId}` : baseUrl;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data: Contato[] = await response.json();
      contatosData.value = data;
      return data;
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    } finally {
      contatosLoading.value = false;
    }
  };

  const getContatos = async (clienteId: number): Promise<Contato[] | null> => {
    contatosLoading.value = true;
    try {
      const url = clienteId ? `${baseUrl}?clienteid=${clienteId}` : baseUrl;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data: Contato[] = await response.json();
      return data;
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    } finally {
      contatosLoading.value = false;
    }
  };

  const getSingleContato = async (id: number): Promise<Contato | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch contact');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    }
  };

  const addContato = async (data: ContatoPayload): Promise<Contato> => {
    try {
      const url = baseUrl;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add contact');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      throw error;
    }
  };

  const updateContato = async (
    id: number,
    newData: ContatoUpdatePayload,
  ): Promise<Contato | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error('Failed to update contact');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    }
  };

  const deleteContato = async (id: number): Promise<boolean> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return true;
    } catch (error) {
      contatosError.value = isError(error) ? error.message : 'Unknown error';
      return false;
    }
  };

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
