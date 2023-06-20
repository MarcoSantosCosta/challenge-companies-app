import { Address } from './Address';

export interface Supplier {
  document: string;
  documentType: 'CPF' | 'CNPJ';
  name: string;
  email: string;
  birthDate: Date;
  rg: string;
  address: Address;
}
