import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGet } from '../../../hooks/useGet';
import { Company } from '../../../@types/Company';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data, perform } = useGet<Company>('company');

  useEffect(() => {
    if (id) {
      const convertedId = parseInt(id);
      perform(convertedId);
      console.log(data);
    }
  });

  return (
    <div>
      {isLoading && <p>Carregando....</p>}
      <p>{error?.error}</p>
      <p>{data?.cnpj}</p>
      <p>{data?.tradeName}</p>
      <p>{data?.address?.city}</p>
      <p>{data?.address?.complement}</p>
      <p>{data?.address?.country}</p>
      <p>{data?.address?.neighborhood}</p>
      <p>{data?.address?.number}</p>
      <p>{data?.address?.state}</p>
      <p>{data?.address?.street}</p>
      <p>{data?.address?.zipCode}</p>
    </div>
  );
};

export default CompanyDetails;
