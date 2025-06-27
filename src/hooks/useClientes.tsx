import { useState } from 'react';
import { isError } from '../utils/isError';
import { Cliente, ClientePayload, ClienteUpdatePayload } from '../types/cliente';
import API_URL from '../utils/API';

interface UseClientsResult {
  clientesData: Cliente[] | [];
  clientesLoading: boolean;
  clientesError: string | null;
  setClientes: (search?: string | null) => Promise<Cliente[] | null>;
  getSingleCliente: (id: string) => Promise<Cliente | null>;
  addCliente: (data: ClientePayload) => Promise<Cliente>;
  updateCliente: (newData: ClienteUpdatePayload, id: string) => Promise<Cliente | null>;
  deleteCliente: (id: string) => Promise<boolean>;
}

function useClientes(): UseClientsResult {
  const [clientesData, setClientesData] = useState<Cliente[] | []>([]);
  const [clientesLoading, setClientesLoading] = useState<boolean>(false);
  const [clientesError, setClientesError] = useState<string | null>(null);

  const baseUrl= `${API_URL}/clientes`;

  async function setClientes(search?: string | null): Promise<Cliente[] | null> {
    setClientesLoading(true);
    setClientesError(null);

    try {
      const url = search ? `${baseUrl}?search=${search}` : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result: Cliente[] = await response.json();
      setClientesData(result);
      return result;
    } catch (err) {
      const errorMessage = "Ocorreu um erro inesperado";
    
      if (isError(err)) {
        setClientesError(errorMessage);
      }

      return null;
    } finally {
      setClientesLoading(false);
    }
  }

  async function getSingleCliente(id: string): Promise<Cliente | null> {
    const trimmedId = id.trim()

    if (!trimmedId) {
      console.error("O ID é obrigatório e não pode ser vazio ou falso");
      return null;
    }

    try {
      const url = `${baseUrl}/${trimmedId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result: Cliente = await response.json();
      return result;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";
    
      isError(err)
        ? setClientesError(errorMessage)
        : setClientesError("Ocorreu um erro inesperado");

      return null;
    }
  }

  async function addCliente(data: ClientePayload): Promise<Cliente> {
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

      const result: Cliente = await response.json();
      return result;
  }

  async function updateCliente(newData: ClienteUpdatePayload, id: string): Promise<Cliente | null> {
    const trimmedId = id.trim()

    if (!trimmedId) {
      console.error("O ID é obrigatório e não pode ser vazio ou falso");
      return null;
    }

    try {
      const url = `${baseUrl}/${trimmedId}`;

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

      const result: Cliente = await response.json();
      return result;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";
    
      isError(err)
        ? setClientesError(errorMessage)
        : setClientesError("Ocorreu um erro inesperado");

      return null;
    }
  }

  async function deleteCliente(id: string): Promise<boolean> {
    const trimmedId = id.trim()

    if (!trimmedId) {
      console.error("O ID é obrigatório e não pode ser vazio ou falso");
      return false;
    }

    try {
      const url = `${baseUrl}/${trimmedId}`;
      const response = await fetch(url, { method: 'DELETE' });

      if (!response.ok) {
          throw new Error(`Erro ao deletar: Status ${response.status}`);
      }

      return response.ok;
    } catch(err) {
      const errorMessage = "Ocorreu um erro inesperado";
    
      isError(err)
        ? setClientesError(errorMessage)
        : setClientesError("Ocorreu um erro inesperado");

      return false;
    }
  }

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

export default useClientes;
