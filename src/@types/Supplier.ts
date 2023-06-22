import { Address } from './Address';

export interface Supplier {
  document: string;
  id: number;
  documentType: 'CPF' | 'CNPJ';
  name: string;
  email: string;
  birthDate: Date;
  rg: string;
  address: Address;
}
