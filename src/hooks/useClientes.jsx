import { useState } from 'react';

const API_URL = 'http://localhost:8080/clientes';

function useClientes() {
  const [clientesData, setClientesData] = useState(null);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [clientesError, setClientesError] = useState(null);

  async function getClientes(id = '') {
    setClientesLoading(true);
    setClientesError(null);

    const baseUrl = API_URL;

    try {
      const url = id ? `${baseUrl}/${id}` : baseUrl;
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

  return { clientesData, clientesLoading, clientesError, getClientes };
}

export default useClientes;
