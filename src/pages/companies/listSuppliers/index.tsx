import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { Supplier } from '../../../@types/Supplier';
import { DataTable } from '../../../components/dataTable';
import { useGet } from '../../../hooks/useGet';

const ListSupplier: React.FC = () => {
  const { data, perform } = useGet<Supplier>('supplier');

  useEffect(() => {
    perform();
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
    { field: 'document', headerName: 'cnpj/cpf', type: 'string' },
    { field: 'name', headerName: 'Nome Fornecedor' },
    { field: 'documentType', headerName: 'Tipo Documento' },
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
      <DataTable rows={data || []} columns={columns}></DataTable>
    </Box>
  );
};

export default ListSupplier;
