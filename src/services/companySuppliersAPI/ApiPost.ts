import axios from 'axios';
import { BASE_URL } from './config/configs';

export default async function execute<T>(resource: string, data: T) {
  const response = await axios.post<any>(`${BASE_URL}/${resource}`, data);
  return response.data;
}
