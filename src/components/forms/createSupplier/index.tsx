import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { usePost } from '../../../hooks/usePost';

import { useCallback, useEffect } from 'react';

import { DateField } from '@mui/x-date-pickers';
import { Supplier } from '../../../@types/Supplier';

const CreateSupplier: React.FC = () => {
  const { error, success, perform } = usePost<Supplier>('supplier');

  const { register, formState, handleSubmit, setValue, control, ...methods } =
    useForm<Supplier>();

  useEffect(() => {
    if (error) {
      if (error && error.errorMessages) {
        error.errorMessages.forEach((errorMessages) => {
          const { message } = errorMessages;
          toast.error(message);
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success('Cadastrado com sucesso');
    }
  }, [success]);

  const onSubmit = (data: Supplier) => {
    console.log('Content', data);
    perform(data);
  };

  const handleChangeBirthdate = useCallback(
    (date: Date) => {
      setValue('birthDate', date);
    },
    [setValue]
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Empresa
        </Typography>

        <FormProvider
          formState={formState}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          control={control}
          // eslint-disable-next-line prettier/prettier
          {...methods}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                {...register('document', { required: true })}
                label="Documento"
                variant="outlined"
                error={Boolean(formState.errors.document)}
                helperText={
                  formState.errors.document && 'Documento é obrigatório'
                }
              />

              <Select
                {...register('document', { required: true })}
                label="Tipo documetno"
                variant="outlined"
                autoWidth
                error={Boolean(formState.errors.document)}
                // eslint-disable-next-line react/jsx-closing-bracket-location
              >
                <MenuItem value={'CPF'}>CPF</MenuItem>
                <MenuItem value={'CNPJ'}>CNPJ</MenuItem>
              </Select>

              <TextField
                {...register('name', { required: true })}
                label="Nome"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.name)}
                helperText={formState.errors.name && 'Nome é obrigatório'}
              />
              <TextField
                {...register('email', { required: true })}
                label="E-mail"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.email)}
                helperText={formState.errors.email && 'E-mail é obrigatório'}
              />
              <Controller
                render={({ field }) => {
                  return (
                    <DateField
                      value={field.value}
                      id="birthDate"
                      label="Data de Nascimento"
                      variant="outlined"
                      fullWidth
                      onChange={(value) => handleChangeBirthdate(value as Date)}
                    />
                  );
                }}
                name="birthDate"
                control={control}
              />
              <TextField
                {...register('rg', { required: true })}
                label="RG"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.rg)}
                helperText={formState.errors.rg && 'RG é obrigatório'}
              />
              <TextField
                {...register('address.street', { required: true })}
                label="Rua"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.street)}
                helperText={
                  formState.errors.address?.street && 'Rua é obrigatória'
                }
              />
              <TextField
                {...register('address.number', { required: true })}
                label="Número"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.number)}
                helperText={
                  formState.errors.address?.number && 'Número é obrigatório'
                }
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
                error={Boolean(formState.errors.address?.neighborhood)}
                helperText={
                  formState.errors.address?.neighborhood &&
                  'Bairro é obrigatório'
                }
              />
              <TextField
                {...register('address.city', { required: true })}
                label="Cidade"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.city)}
                helperText={
                  formState.errors.address?.city && 'Cidade é obrigatória'
                }
              />
              <TextField
                {...register('address.state', { required: true })}
                label="Estado"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.state)}
                helperText={
                  formState.errors.address?.state && 'Estado é obrigatório'
                }
              />
              <TextField
                {...register('address.zipCode', { required: true })}
                label="CEP"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.zipCode)}
                helperText={
                  formState.errors.address?.zipCode && 'CEP é obrigatório'
                }
              />

              <TextField
                {...register('address.country', { required: true })}
                label="País"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.country)}
                helperText={
                  formState.errors.address?.country && 'País é obrigatório'
                }
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Cadastrar Empresa
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default CreateSupplier;
