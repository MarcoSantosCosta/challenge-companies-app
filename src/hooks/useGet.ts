import { AxiosError } from 'axios';
import { useState } from 'react';
import { Company } from '../@types/Company';
import { ErrorResponse } from '../@types/ErrorResponse';
import { performGet } from '../services/companySuppliersAPI/ApiGet';

export function useGet<T>(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();
  const [data, setData] = useState<T | null>();

  async function perform(id?: number, op?: string) {
    setIsLoading(true);
    setError(null);

    performGet(resource, id, op)
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
