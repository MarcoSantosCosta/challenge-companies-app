import axios from 'axios';
import { BASE_URL } from './config/configs';

export default async function execute<T>(
  resource: string,
  id: number,
  data: T
) {
  const response = await axios.put<unknown>(
    `${BASE_URL}/${resource}/${id}`,
    data
  );
  return response.data;
}
