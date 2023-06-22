import { Card } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Supplier } from '../../../@types/Supplier';
import { useGet } from '../../../hooks/useGet';
import { usePost } from '../../../hooks/usePost';

interface InsertSupplierProps {
  companyId: number;
}

export const InsertSupplier = (props: InsertSupplierProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, error, data, perform } = useGet<Supplier>('supplier');
  const [supplier, setSupplier] = useState<Supplier>();

  const post = usePost('company');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>();

  interface FormInterface {
    cnpj: string;
  }

  useEffect(() => {
    if (data) {
      setSupplier(data);
    }
  }, [data]);

  const onSubmit = (formData: FormInterface) => {
    if (formData?.cnpj) {
      perform(undefined, `CNPJ/${formData.cnpj}`);
    }
    console.log(formData);
  };

  useEffect(() => {
    if (post.error && post.error.errorMessages) {
      post.error.errorMessages.forEach((errorMessages) => {
        const { message } = errorMessages;
        toast.error(message);
      });
    } else if (post.success) {
      toast.success('Fornecedor inserido atualizada com sucesso');
      setIsOpen(false);
    }
  }, [post.error, post.success]);

  const handleInsert = (id: number) => {
    if (props.companyId && supplier?.id) {
      console.log({ supplierId: supplier.id });
      post.perform({ supplierId: supplier.id }, props.companyId, 'supplier');
    }
  };

  return (
    <Box>
      <Modal open={isOpen}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: '10em',
          }}>
          <Card style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <CloseIcon onClick={() => setIsOpen(false)} />
              <Typography variant="h5" align="center" gutterBottom>
                Cadastro de Empresa
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: 5 }}>
                <TextField
                  {...register('cnpj', { required: true })}
                  label="CNPJ"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.cnpj)}
                  helperText={errors.cnpj && 'CNPJ é obrigatório'}
                />

                <Button type="submit" variant="contained" color="primary">
                  <SearchIcon />
                </Button>
              </form>
            </Box>
            {isLoading && 'Carregando...'}
            {supplier ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Typography variant="body2" justifySelf="center">
                  {supplier?.name}
                </Typography>
                <Button
                  color="primary"
                  onClick={() => {
                    handleInsert(supplier?.id);
                  }}>
                  Inserir
                </Button>
              </Box>
            ) : (
              ''
            )}
          </Card>
        </Box>
      </Modal>
      <Button onClick={() => setIsOpen(true)} variant="contained">
        Inserir Forncedor
      </Button>
    </Box>
  );
};
