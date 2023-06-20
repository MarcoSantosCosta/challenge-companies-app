import axios from 'axios';
import { BASE_URL } from './config/configs';

async function performGet(resource: string, id?: number) {
  const url = `${BASE_URL}/${resource}${id ? `/${id}` : ''}`;
  console.log('Bataaaaaa:' + url);
  const response = await axios.get<unknown>(url);
  return response.data;
}

export { performGet };
