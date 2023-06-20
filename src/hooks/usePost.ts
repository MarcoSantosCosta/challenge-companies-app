import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../@types/ErrorResponse';
import { performPost } from '../services/companySuppliersAPI/ApiPost';

export function usePost<T>(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();

  async function perform(dados: T) {
    setIsLoading(true);
    setError(null);

    performPost<T>(resource, dados)
      .then(() => {
        setSuccess(true);
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
        console.log('asdasdasdasdasdasdasd');
      })
      .catch(({ response }: AxiosError) => {
        const errorResponse = response?.data as ErrorResponse;
        setError(errorResponse);
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, success, perform };
}
