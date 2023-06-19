import axios from 'axios';
import { BASE_URL } from './config/configs';

export default async function execute<T>(resource: string, id: number) {
  const response = await axios.delete<any>(`${BASE_URL}/${resource}/${id}`);
  return response.data;
}
