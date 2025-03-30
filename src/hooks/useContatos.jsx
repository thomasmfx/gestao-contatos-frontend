import { useState } from 'react';

const API_URL = 'http://localhost:8080/contatos';

function useContatos() {
  const [contatosData, setContatosData] = useState(null);
  const [contatosLoading, setContatosLoading] = useState(false);
  const [contatosError, setContatosError] = useState(null);

  async function getContatos(id = '') {
    setContatosLoading(true);
    setContatosError(null);

    const baseUrl = API_URL;

    try {
      const url = id ? `${baseUrl}/${id}` : baseUrl;
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

  return { contatosData, contatosLoading, contatosError, getContatos };
}

export default useContatos;
