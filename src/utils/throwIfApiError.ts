import { ApiError } from './errors';

async function throwIfApiError(response: Response): Promise<void> {
  if (!response.ok) {
    const errorBody = await response.json();
    throw new ApiError(errorBody.message, errorBody.status);
  }
}

export default throwIfApiError;
