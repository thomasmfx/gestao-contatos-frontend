import type { Endereco } from '@/types/Endereco';

import throwIfApiError from '@/utils/throwIfApiError';
import API_URL from '@/utils/API';

function useEndereco() {
  const baseUrl = `${API_URL}/endereco`;

  const getEndereco = async (cep: string): Promise<Endereco> => {
    const url = `${baseUrl}/${cep}`;
    const response = await fetch(url);

    await throwIfApiError(response);

    return await response.json();
  };

  return getEndereco;
}

export default useEndereco;
