import { useState } from 'react';

import API_URL from '../utils/API';

function useContatos() {
  const [contatosData, setContatosData] = useState(null);
  const [contatosLoading, setContatosLoading] = useState(false);
  const [contatosError, setContatosError] = useState(null);

  const baseUrl = API_URL + 'contatos';

  async function setContatos(clienteId = null) {
    setContatosLoading(true);
    setContatosError(null);

    try {
      const url = clienteId
        ? `${baseUrl}${'?clienteid=' + clienteId}`
        : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      setContatosData(result);
      return result;
    } catch (err) {
      setContatosError(err.message);
      return null;
    } finally {
      setContatosLoading(false);
    }
  }

  async function getContatos(clienteId) {
    try {
      const url = `${baseUrl}${'?clienteid=' + clienteId}`;

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

  async function getSingleContato(id) {
    try {
      const url = `${baseUrl}/${id}`;

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

  async function addContato(data) {
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

  async function updateContato(id, newData) {
    try {
      const url = `${baseUrl}/${id}`;

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

  async function deleteContato(id) {
    try {
      const url = `${baseUrl}/${id}`;

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

export default useContatos;
