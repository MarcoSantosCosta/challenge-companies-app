import { Box, Button, Icon } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../@types/Company';
import { DataTable } from '../../atoms/dataTable';
import { useGet } from '../../../hooks/useGet';

const ListCompanies: React.FC = () => {
  const { isLoading, error, data, perform } = useGet<Company>('company');

  const navigate = useNavigate();

  useEffect(() => {
    perform();
  }, []);

  const handleViewClick = (id: GridRowId) => () => {
    navigate(`/company/${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', filterable: false, flex: 1 },
    { field: 'cnpj', headerName: 'cnpj', type: 'string', filterable: false, flex: 1 },
    { field: 'tradeName', headerName: 'Nome Fantasia', filterable: false, flex: 1 },
    {
      field: 'address.zipCode',
      headerName: 'CEP',
      width: 130,
      valueGetter: (params) => params.row.address?.zipCode || '',
      filterable: false,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Visualizar',
      type: 'actions',
      flex: 1,
      cellClassName: 'actions',
      getActions({ id }) {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon></VisibilityIcon>}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleViewClick(id)}></GridActionsCellItem>,
        ];
      },
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '20px',
        justifyContent: 'center',
      }}>
      <Box sx={{ width: '80%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'rigth',
            marginBottom: '20px',
          }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/company/add')}>
            Nova Empresa
          </Button>
        </Box>
        {isLoading && <p>Carregando....</p>}
        {error?.error}
        {data?.cnpj}
        {data?.address?.city}

        <DataTable rows={data || []} columns={columns}></DataTable>
      </Box>
    </Box>
  );
};

export default ListCompanies;
