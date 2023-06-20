import React, { useEffect } from 'react';
import { useGet } from '../../../hooks/useGet';
import { DataTable } from '../../../components/dataTable';
import { GridColDef } from '@mui/x-data-grid';
import { Company } from '../../../@types/Company';
import { Box } from '@mui/material';

const ListCompanies: React.FC = () => {
  const { isLoading, error, data, perform } = useGet<Company>('company');

  useEffect(() => {
    perform();
    console.log(data);
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
    { field: 'cnpj', headerName: 'cnpj', type: 'string' },
    { field: 'tradeName', headerName: 'Nome Fantasia' },
    {
      field: 'address.zipCode',
      headerName: 'CEP',
      width: 130,
      valueGetter: (params) => params.row.address?.zipCode || '',
    },
    {
      field: 'address.zipCode',
      headerName: 'CEP',
      width: 130,
      valueGetter: (params) => params.row.address?.state || '',
    },
  ];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading && <p>Carregando....</p>}
      {error?.error}
      {data?.cnpj}
      {data?.address?.city}
      <DataTable rows={data || []} columns={columns}></DataTable>
    </Box>
  );
};

export default ListCompanies;
