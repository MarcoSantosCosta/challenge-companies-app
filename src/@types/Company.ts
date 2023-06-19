import { Address } from './Address';

export interface Company {
  id?: number;
  cnpj: string;
  tradeName: string;
  address: Address;
}
