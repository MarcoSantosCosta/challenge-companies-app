import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../@types/ErrorResponse';
import { performDelete } from '../services/companySuppliersAPI/ApiDelete';

export function useDelete(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();

  async function perform(id: number) {
    setIsLoading(true);
    setError(null);

    performDelete(resource, id)
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
