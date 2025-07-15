import { ref, type Ref } from 'vue';

import type {
  Cliente,
  ClientePayload,
  ClienteUpdatePayload,
} from '../types/Cliente';

import { isError } from '../utils/isError';
import API_URL from '../utils/API';

interface UseClientsResult {
  clientesData: Ref<Cliente[] | []>;
  clientesLoading: Ref<boolean>;
  clientesError: Ref<string | null>;
  setClientes: (search?: string | number | null) => Promise<Cliente[] | null>;
  getSingleCliente: (id: number) => Promise<Cliente | null>;
  addCliente: (data: ClientePayload) => Promise<Cliente>;
  updateCliente: (
    id: number,
    newData: ClienteUpdatePayload,
  ) => Promise<Cliente | null>;
  deleteCliente: (id: number) => Promise<boolean>;
}

export function useClientes(): UseClientsResult {
  const clientesData = ref<Cliente[]>([]);
  const clientesLoading = ref<boolean>(false);
  const clientesError = ref<string | null>(null);

  const baseUrl = `${API_URL}/clientes`;

  const setClientes = async (
    search?: string | number | null,
  ): Promise<Cliente[] | null> => {
    clientesLoading.value = true;
    try {
      const url = search ? `${baseUrl}?search=${search}` : baseUrl;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Falha ao buscar clientes');
      const data: Cliente[] = await response.json();
      clientesData.value = data;
      return data;
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    } finally {
      clientesLoading.value = false;
    }
  };

  const getSingleCliente = async (id: number): Promise<Cliente | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Cliente não encontrado');
      return await response.json();
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    }
  };

  const addCliente = async (data: ClientePayload): Promise<Cliente> => {
    try {
      const url = baseUrl;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao adicionar cliente');
      return await response.json();
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      throw error;
    }
  };

  const updateCliente = async (
    id: number,
    newData: ClienteUpdatePayload,
  ): Promise<Cliente | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error('Failed to update client');
      return await response.json();
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      return null;
    }
  };

  const deleteCliente = async (id: number): Promise<boolean> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete client');
      return true;
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      return false;
    }
  };

  return {
    clientesData,
    clientesLoading,
    clientesError,
    setClientes,
    getSingleCliente,
    addCliente,
    updateCliente,
    deleteCliente,
  };
}
