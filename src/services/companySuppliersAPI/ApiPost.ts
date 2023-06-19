import axios from 'axios';
import { BASE_URL } from './config/configs';

async function performPost<T>(resource: string, data: T) {
  const response = await axios.post<any>(`${BASE_URL}/${resource}`, data);
  return response.data;
}

export { performPost };
