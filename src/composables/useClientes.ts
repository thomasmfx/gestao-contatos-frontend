import { isError } from '../utils/isError';
import type {
  Cliente,
  ClientePayload,
  ClienteUpdatePayload,
} from '../types/Cliente';
import API_URL from '../utils/API';
import type { ID } from '../types/ID';
import { ref, type Ref } from 'vue';

interface UseClientsResult {
  clientesData: Ref<Cliente[] | []>;
  clientesLoading: Ref<boolean>;
  clientesError: Ref<string | null>;
  setClientes: (search?: string | number | null) => Promise<Cliente[] | null>;
  getSingleCliente: (id: ID) => Promise<Cliente | null>;
  addCliente: (data: ClientePayload) => Promise<Cliente>;
  updateCliente: (
    newData: ClienteUpdatePayload,
    id: ID,
  ) => Promise<Cliente | null>;
  deleteCliente: (id: ID) => Promise<boolean>;
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
      if (!response.ok) throw new Error('Failed to fetch clients');
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

  const getSingleCliente = async (id: ID): Promise<Cliente | null> => {
    try {
      const url = `${baseUrl}/${id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch client');
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
      if (!response.ok) throw new Error('Failed to add client');
      return await response.json();
    } catch (error) {
      clientesError.value = isError(error) ? error.message : 'Unknown error';
      throw error;
    }
  };

  const updateCliente = async (
    newData: ClienteUpdatePayload,
    id: ID,
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

  const deleteCliente = async (id: ID): Promise<boolean> => {
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
