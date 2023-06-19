import axios from 'axios';
import { useEffect, useState } from 'react';

export function useApi<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetcing] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setIsFetcing(false));
  }, []);
  return { data, isFetching };
}
