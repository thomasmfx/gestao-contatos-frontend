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

  async function getContatos(clienteId = null) {
    try {
      const url = clienteId
        ? `${baseUrl}${'?clienteid=' + clienteId}`
        : baseUrl;

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
    contatosData,
    contatosLoading,
    contatosError,
    setContatos,
    getContatos,
  };
}

export default useContatos;
