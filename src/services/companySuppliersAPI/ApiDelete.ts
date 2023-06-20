import axios from 'axios';
import { BASE_URL } from './config/configs';

async function performDelete(resource: string, id: number) {
  const response = await axios.delete<unknown>(`${BASE_URL}/${resource}/${id}`);
  return response.data;
}

export { performDelete };
