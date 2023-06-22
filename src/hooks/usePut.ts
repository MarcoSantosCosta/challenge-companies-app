import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../@types/ErrorResponse';
import performPut from '../services/companySuppliersAPI/ApiPut';

export function usePut<T>(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();
  const [data, setData] = useState<T | null>();

  async function perform(id: number, input: T) {
    setIsLoading(true);
    setError(null);

    performPut(resource, id, input)
      .then((response) => {
        setSuccess(true);
        console.log(response);
        setData(response as T);
      })
      .catch(({ response }: AxiosError) => {
        const errorResponse = response?.data as ErrorResponse;
        setError(errorResponse);
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, success, data, perform };
}
