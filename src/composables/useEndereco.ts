import type { Endereco } from '@/types/Endereco';

import { ApiError } from '@/utils/errors';
import API_URL from '@/utils/API';

function useEndereco() {
  const baseUrl = `${API_URL}/endereco`;

  const getEndereco = async (cep: string): Promise<Endereco> => {
    const url = `${baseUrl}/${cep}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new ApiError(errorBody.message, response.status);
    }

    const data: Endereco = await response.json();
    return data;
  };

  return getEndereco;
}

export default useEndereco;
