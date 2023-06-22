import axios from 'axios';
import { BASE_URL } from './config/configs';

async function performPost<T>(resource: string, data: T, id?: number, op?: string) {
  const url = `${BASE_URL}/${resource}${id ? `/${id}` : ''}${op ? `/${op}` : ''}`;
  const response = await axios.post<unknown>(url, data);

  return response.data;
}

export { performPost };
