import { useForm } from 'react-hook-form';
import { Company } from '../../../@types/Company';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePost } from '../../../hooks/usePost';

import { useNavigate } from 'react-router-dom';

const CreateCompany: React.FC = () => {
  const { error, success, perform } = usePost<Company>('company');
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.errorMessages) {
      error.errorMessages.forEach((errorMessages) => {
        const { message } = errorMessages;
        toast.error(message);
      });
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();

  useEffect(() => {
    if (success) {
      toast.success('Cadastrado com sucesso');
      setTimeout(() => {
        navigate('/company');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const onSubmit = (data: Company) => {
    perform(data);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Empresa
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              {...register('tradeName', { required: true })}
              label="Razão Social"
              variant="outlined"
              fullWidth
              error={Boolean(errors.tradeName)}
              helperText={errors.tradeName && 'Razão Social é obrigatória'}
            />

            <TextField
              {...register('cnpj', { required: true })}
              label="CNPJ"
              variant="outlined"
              fullWidth
              error={Boolean(errors.cnpj)}
              helperText={errors.cnpj && 'CNPJ é obrigatório'}
            />

            <TextField
              {...register('address.street', { required: true })}
              label="Rua"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.street)}
              helperText={errors.address?.street && 'Rua é obrigatória'}
            />

            <TextField
              {...register('address.number', {
                required: true,
                pattern: /^[0-9]*$/,
              })}
              label="Número"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.number)}
              helperText={errors.address?.number && 'Número é obrigatório'}
            />

            <TextField
              {...register('address.complement')}
              label="Complemento"
              variant="outlined"
              fullWidth
            />

            <TextField
              {...register('address.neighborhood', { required: true })}
              label="Bairro"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.neighborhood)}
              helperText={
                errors.address?.neighborhood && 'Bairro é obrigatório'
              }
            />

            <TextField
              {...register('address.city', { required: true })}
              label="Cidade"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.city)}
              helperText={errors.address?.city && 'Cidade é obrigatória'}
            />

            <TextField
              {...register('address.state', { required: true })}
              label="Estado"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.state)}
              helperText={errors.address?.state && 'Estado é obrigatório'}
            />

            <TextField
              {...register('address.zipCode', { required: true })}
              label="CEP"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.zipCode)}
              helperText={errors.address?.zipCode && 'CEP é obrigatório'}
            />

            <TextField
              {...register('address.country', { required: true })}
              label="País"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address?.country)}
              helperText={errors.address?.country && 'País é obrigatório'}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar Empresa
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateCompany;
