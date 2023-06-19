import axios from 'axios';
import { BASE_URL } from './config/configs';

async function performPut<T>(resource: string, id: number, data: T) {
  const response = await axios.put<any>(`${BASE_URL}/${resource}/${id}`, data);
  return response.data;
}

export { performPut };
