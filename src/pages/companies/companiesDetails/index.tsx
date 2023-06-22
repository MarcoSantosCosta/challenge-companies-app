import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../hooks/useGet';
import { Company } from '../../../@types/Company';
import { Box, Button, Card } from '@mui/material';
import ProfileCard from '../../../components/profileCard';
import { DataTable } from '../../../components/atoms/dataTable';
import DeleteCompany from '../../../components/company/deleteCompany';
import ListSupplier from '../listSuppliers';
import Loading from '../../../components/atoms/loading/loading';
import { GridColDef } from '@mui/x-data-grid';
import { Supplier } from '../../../@types/Supplier';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data, perform } = useGet<Company>('company');

  const getsuppliers = useGet<Supplier[]>('company');

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
    { field: 'document', headerName: 'cnpj/cpf', type: 'string', flex: 1 },
    { field: 'name', headerName: 'Nome Fornecedor', flex: 1 },
    { field: 'documentType', headerName: 'Tipo Documento', flex: 1 },
    {
      field: 'address.zipCode',
      headerName: 'CEP',
      valueGetter: (params) => params.row.address?.zipCode || '',
      flex: 1,
    },
  ];

  useEffect(() => {
    if (id) {
      const convertedId = parseInt(id);
      perform(convertedId);
      getsuppliers.perform(convertedId, 'suppliers');
      console.log(data);
      console.log(getsuppliers.data);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '20px',
        justifyContent: 'center',
      }}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ width: '80%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'rigth',
              marginBottom: '20px',
              gap: 1,
            }}>
            <DeleteCompany id={data?.id} />
            <Button onClick={() => navigate(`/company/${id}/edit`)} variant="contained">
              Editar
            </Button>
          </Box>
          <Card>
            <ProfileCard company={data} />
          </Card>
          <DataTable rows={getsuppliers.data || []} columns={columns}></DataTable>
        </Box>
      )}
    </Box>
  );
};

export default CompanyDetails;
