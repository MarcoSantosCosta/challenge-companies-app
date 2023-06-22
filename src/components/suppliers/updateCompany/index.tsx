import { useForm } from 'react-hook-form';
import { Company } from '../../../@types/Company';
import { estados } from '../../../consts';

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../hooks/useGet';
import { usePut } from '../../../hooks/usePut';

const UpadateCompany: React.FC = () => {
  const post = usePut<Company>('company');

  const get = useGet<Company>('company');

  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);

  const { id } = useParams<{ id: string }>();

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Company>();

  useEffect(() => {
    if (id) {
      get.perform(parseInt(id));
      console.log(get.data);
    }
  }, []);

  useEffect(() => {
    if (get.data) {
      reset(get.data as Company);
      setLoaded(true);
    }
  }, [get.data]);

  useEffect(() => {
    if (post.error && post.error.errorMessages) {
      post.error.errorMessages.forEach((errorMessages) => {
        const { message } = errorMessages;
        toast.error(message);
      });
    } else if (post.success) {
      toast.success('Empresa atualizada com sucesso');
      setTimeout(() => {
        navigate('/company/');
      }, 2000);
    }
  }, [post.error, post.success, navigate]);

  const onSubmit = (data: Company) => {
    if (id) {
      post.perform(parseInt(id), data);
    }
  };

  return (
    <Container maxWidth="sm">
      {loaded ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Cadastro de Empresa
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                {...register('tradeName', { required: true })}
                defaultValue={watch('tradeName')}
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
                defaultValue={watch('cnpj')}
                error={Boolean(errors.cnpj)}
                helperText={errors.cnpj && 'CNPJ é obrigatório'}
              />

              <TextField
                {...register('address.zipCode', { required: true })}
                label="CEP"
                defaultValue={watch('address.zipCode')}
                variant="outlined"
                fullWidth
                error={Boolean(errors.address?.zipCode)}
                helperText={errors.address?.zipCode && 'CEP é obrigatório'}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '9fr 3fr',
                  gap: 2,
                }}>
                <TextField
                  {...register('address.street', { required: true })}
                  label="Rua"
                  variant="outlined"
                  defaultValue={watch('address.street')}
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
                  defaultValue={watch('address.number')}
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.address?.number)}
                  helperText={errors.address?.number && 'Número é obrigatório'}
                />
              </Box>

              <TextField
                {...register('address.neighborhood', { required: true })}
                label="Bairro"
                defaultValue={watch('address.neighborhood')}
                variant="outlined"
                fullWidth
                error={Boolean(errors.address?.neighborhood)}
                helperText={errors.address?.neighborhood && 'Bairro é obrigatório'}
              />
              <TextField
                {...register('address.complement')}
                label="Complemento"
                defaultValue={watch('address.complement')}
                variant="outlined"
                fullWidth
                style={{ height: '70%' }}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '4fr 4fr 4fr',
                  gap: 2,
                }}>
                <TextField
                  {...register('address.city', { required: true })}
                  label="Cidade"
                  defaultValue={watch('address.city')}
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.address?.city)}
                  helperText={errors.address?.city && 'Cidade é obrigatória'}
                />
                <FormControl>
                  <InputLabel id="state">Age</InputLabel>
                  <Select
                    {...register('address.state', { required: true })}
                    label="Estado"
                    labelId="state"
                    defaultValue={watch('address.state')}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.address?.state)}>
                    {estados.map((estado) => (
                      <MenuItem key={estado} value={estado}>
                        {estado}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  {...register('address.country', { required: true })}
                  label="País"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.address?.country)}
                  helperText={errors.address?.country && 'País é obrigatório'}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Atualizar Empresa
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      ) : (
        <Typography variant="h4" align="center" gutterBottom>
          Empresa não encontrada
        </Typography>
      )}
    </Container>
  );
};

export default UpadateCompany;
