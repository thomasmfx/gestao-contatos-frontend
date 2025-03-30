import { useState } from 'react';

const API_URL = 'http://localhost:8080/clientes';

function useClientes() {
  const [clientesData, setClientesData] = useState(null);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [clientesError, setClientesError] = useState(null);

  const baseUrl = API_URL;

  async function setClientes(search = null) {
    setClientesLoading(true);
    setClientesError(null);

    try {
      const url = search ? `${baseUrl}${'?search=' + search}` : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      setClientesData(result);
      return result;
    } catch (err) {
      setClientesError(err.message);
      return null;
    } finally {
      setClientesLoading(false);
    }
  }

  async function getCliente(id = '') {
    try {
      const url = id ? `${baseUrl}${'/' + id}` : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch {
      return null;
    }
  }

  return {
    clientesData,
    clientesLoading,
    clientesError,
    setClientes,
    getCliente,
  };
}

export default useClientes;
