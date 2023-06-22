import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../@types/ErrorResponse';
import { performPost } from '../services/companySuppliersAPI/ApiPost';

export function usePost<T>(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();
  // const [data, setData] = useState<T | null>();

  async function perform(dados: T, id?: number, op?: string) {
    setIsLoading(true);
    setError(null);

    performPost<T>(resource, dados, id, op)
      .then(() => {
        setSuccess(true);
      })
      .catch(({ response }: AxiosError) => {
        const errorResponse = response?.data as ErrorResponse;
        setError(errorResponse);
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, success, perform };
}
