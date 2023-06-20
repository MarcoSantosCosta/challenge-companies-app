import { AxiosError } from 'axios';
import { useState } from 'react';
import { Company } from '../@types/Company';
import { ErrorResponse } from '../@types/ErrorResponse';
import { performGet } from '../services/companySuppliersAPI/ApiGet';

export function useGet<T>(resource: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>();
  const [success, setSuccess] = useState<boolean | null>();
  const [data, setData] = useState<Company | null>();

  async function perform(id?: number) {
    setIsLoading(true);
    setError(null);

    performGet<T>(resource, id)
      .then((response: Company) => {
        setSuccess(true);
        console.log(response);
        setData(response as Company);
      })
      .catch(({ response }: AxiosError) => {
        const errorResponse = response?.data as ErrorResponse;
        setError(errorResponse);
      })
      .finally(() => setIsLoading(false));
  }

  return { isLoading, error, success, data, perform };
}
