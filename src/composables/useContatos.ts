import { ref, type Ref } from 'vue';

import throwIfApiError from '@/utils/throwIfApiError';

import type {
  Contato,
  ContatoPayload,
  ContatoUpdatePayload,
} from '../types/Contato';

import API_URL from '../utils/API';

interface UseContatosResult {
  contatosData: Ref<Contato[] | []>;
  setContatos: (clienteId?: number, search?: string) => Promise<void>;
  getSingleContato: (id: number) => Promise<Contato>;
  addContato: (data: ContatoPayload) => Promise<Contato>;
  updateContato: (
    id: number,
    newData: ContatoUpdatePayload,
  ) => Promise<Contato>;
  deleteContato: (id: number) => Promise<void>;
}

export function useContatos(): UseContatosResult {
  const contatosData = ref<Contato[]>([]);

  const baseUrl = `${API_URL}/contatos`;

  const setContatos = async (
    clienteId?: number,
    search?: string,
  ): Promise<void> => {
    let url = clienteId ? `${baseUrl}?clienteid=${clienteId}` : baseUrl;
    if (search) url += `&search=${search}`;
    const response = await fetch(url);

    await throwIfApiError(response);

    contatosData.value = await response.json();
  };

  const getSingleContato = async (id: number): Promise<Contato> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url);

    await throwIfApiError(response);

    return await response.json();
  };

  const addContato = async (data: ContatoPayload): Promise<Contato> => {
    const url = baseUrl;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    await throwIfApiError(response);

    return await response.json();
  };

  const updateContato = async (
    id: number,
    newData: ContatoUpdatePayload,
  ): Promise<Contato> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    await throwIfApiError(response);

    return await response.json();
  };

  const deleteContato = async (id: number): Promise<void> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    await throwIfApiError(response);
  };

  return {
    contatosData,
    setContatos,
    getSingleContato,
    addContato,
    updateContato,
    deleteContato,
  };
}
