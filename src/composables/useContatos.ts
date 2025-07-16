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
  setContatos: (
    clienteId?: number,
    search?: string,
  ) => Promise<Contato[] | null>;
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

  const setContatos = async (
    clienteId?: number,
    search?: string,
  ): Promise<Contato[] | null> => {
    contatosLoading.value = true;
    try {
      let url = clienteId ? `${baseUrl}?clienteid=${clienteId}` : baseUrl;
      if (search) url += `&search=${search}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar contatos');
      const data: Contato[] = await response.json();
      contatosData.value = data;
      return data;
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
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
      if (!response.ok) throw new Error('Erro ao buscar contatos');
      const data: Contato[] = await response.json();
      return data;
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
      return null;
    } finally {
      contatosLoading.value = false;
    }
  };

  const getSingleContato = async (id: number): Promise<Contato | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar contato');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
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
      if (!response.ok) throw new Error('Erro ao adicionar contato');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
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
      if (!response.ok) throw new Error('Erro ao atualizar contato');
      return await response.json();
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
      return null;
    }
  };

  const deleteContato = async (id: number): Promise<boolean> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir contato');
      return true;
    } catch (error) {
      contatosError.value = isError(error)
        ? error.message
        : 'Erro desconhecido';
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
