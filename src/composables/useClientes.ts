import { ref, type Ref } from 'vue';

import throwIfApiError from '@/utils/throwIfApiError';

import type {
  Cliente,
  ClientePayload,
  ClienteUpdatePayload,
} from '../types/Cliente';

import API_URL from '../utils/API';

interface UseClientsResult {
  clientesData: Ref<Cliente[] | []>;
  setClientes: (search?: string | number | null) => Promise<void>;
  getSingleCliente: (id: number) => Promise<Cliente | null>;
  addCliente: (data: ClientePayload) => Promise<Cliente>;
  updateCliente: (
    id: number,
    newData: ClienteUpdatePayload,
  ) => Promise<Cliente>;
  deleteCliente: (id: number) => Promise<void>;
}

export function useClientes(): UseClientsResult {
  const clientesData = ref<Cliente[]>([]);

  const baseUrl = `${API_URL}/clientes`;

  const setClientes = async (
    search?: string | number | null,
  ): Promise<void> => {
    const url = search ? `${baseUrl}?search=${search}` : baseUrl;
    const response = await fetch(url);

    await throwIfApiError(response);

    clientesData.value = await response.json();
  };

  const getSingleCliente = async (id: number): Promise<Cliente | null> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url);

    await throwIfApiError(response);

    return await response.json();
  };

  const addCliente = async (data: ClientePayload): Promise<Cliente> => {
    const url = baseUrl;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    await throwIfApiError(response);

    return await response.json();
  };

  const updateCliente = async (
    id: number,
    newData: ClienteUpdatePayload,
  ): Promise<Cliente> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    await throwIfApiError(response);

    return await response.json();
  };

  const deleteCliente = async (id: number): Promise<void> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    await throwIfApiError(response);
  };

  return {
    clientesData,
    setClientes,
    getSingleCliente,
    addCliente,
    updateCliente,
    deleteCliente,
  };
}
