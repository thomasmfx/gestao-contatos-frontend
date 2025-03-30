import { useState } from 'react';

import API_URL from '../utils/API';

function useClientes() {
  const [clientesData, setClientesData] = useState(null);
  const [clientesLoading, setClientesLoading] = useState(false);
  const [clientesError, setClientesError] = useState(null);

  const baseUrl = API_URL + 'clientes';

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

  async function getSingleCliente(id = '') {
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

  async function addCliente(data) {
    try {
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

      const result = await response.json();
      return result;
    } catch {
      return null;
    }
  }

  async function updateCliente(id = '', newData) {
    try {
      const url = `${baseUrl}${'/' + id}`;

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

      const result = await response.json();
      return result;
    } catch {
      return null;
    }
  }

  async function deleteCliente(id = '') {
    try {
      const url = `${baseUrl}${'/' + id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

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
    getSingleCliente,
    addCliente,
    updateCliente,
    deleteCliente,
  };
}

export default useClientes;
