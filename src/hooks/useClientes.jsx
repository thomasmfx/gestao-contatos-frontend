import { useState } from 'react';

const API_URL = 'http://localhost:8080/clientes';

function useClientes() {
  const [clientesData, setClientesData] = useState(null);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [clientesError, setClientesError] = useState(null);

  async function getClientes(id = '', search = null) {
    setClientesLoading(true);
    setClientesError(null);

    const baseUrl = API_URL;

    try {
      let url = baseUrl;

      if (id !== '') url = id ? `${baseUrl}/${id}` : baseUrl;
      else if (search !== null)
        url = search ? `${baseUrl}${'?search=' + search}` : baseUrl;

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
