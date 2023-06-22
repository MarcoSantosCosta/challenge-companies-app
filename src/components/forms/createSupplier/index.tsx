import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Container, FormControl, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { usePost } from '../../../hooks/usePost';

import { useCallback, useEffect, useState } from 'react';

import { DateField } from '@mui/x-date-pickers';
import { Supplier } from '../../../@types/Supplier';
import { estados } from '../../../consts';
import { useNavigate } from 'react-router-dom';

const CreateSupplier: React.FC = () => {
  const { error, success, perform } = usePost<Supplier>('supplier');
  const { register, formState, handleSubmit, setValue, control, ...methods } = useForm<Supplier>();

  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ'>('CPF');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (error && error.errorMessages) {
        error.errorMessages.forEach((errorMessages) => {
          const { message } = errorMessages;
          toast.error(message);
        });
      }
    } else if (success) {
      toast.success('Cadastrado com sucesso');
      setTimeout(() => {
        navigate('/supplier/');
      }, 2000);
    }
  }, [error, success]);

  const onSubmit = (data: Supplier) => {
    console.log('Content', data);
    perform(data);
  };

  const hangleChangeDocumentType = (event: SelectChangeEvent) => {
    const value = event.target.value as 'CPF' | 'CNPJ';
    setDocumentType(value);
    setValue('documentType', value);
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
          Cadastro de Fornecedor
        </Typography>
        <FormProvider
          formState={formState}
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          control={control}
          {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'grid', gap: 2 }}>
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
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 4fr',
                  gap: 2,
                }}>
                <FormControl>
                  <InputLabel id="documentType">Tipo Documento</InputLabel>
                  <Select
                    {...register('documentType', { required: true })}
                    labelId="documentType"
                    label="Tipo Documento"
                    variant="outlined"
                    autoWidth
                    defaultValue="CPF"
                    onChange={hangleChangeDocumentType}
                    error={Boolean(formState.errors.document)}>
                    <MenuItem value={'CNPJ'}>CNPJ</MenuItem>
                    <MenuItem value={'CPF'}>CPF</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  {...register('document', { required: true })}
                  label="Documento"
                  variant="outlined"
                  error={Boolean(formState.errors.document)}
                  helperText={formState.errors.document && 'Documento é obrigatório'}
                />
              </Box>
              {documentType == 'CPF' ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '4r 1fr',
                    gap: 2,
                  }}>
                  <TextField
                    {...register('rg', { required: true })}
                    label="RG"
                    variant="outlined"
                    error={Boolean(formState.errors.rg)}
                    helperText={formState.errors.rg && 'RG é obrigatório'}
                  />
                  <Controller
                    render={({ field }) => {
                      return (
                        <DateField
                          value={field.value}
                          id="birthDate"
                          label="Data de Nascimento"
                          variant="outlined"
                          onChange={(value) => handleChangeBirthdate(value as Date)}
                        />
                      );
                    }}
                    name="birthDate"
                    control={control}
                  />
                </Box>
              ) : (
                ''
              )}

              <TextField
                {...register('address.zipCode', { required: true })}
                label="CEP"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.zipCode)}
                helperText={formState.errors.address?.zipCode && 'CEP é obrigatório'}
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
                  fullWidth
                  error={Boolean(formState.errors.address?.street)}
                  helperText={formState.errors.address?.street && 'Rua é obrigatória'}
                />

                <TextField
                  {...register('address.number', {
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                  label="Número"
                  variant="outlined"
                  fullWidth
                  error={Boolean(formState.errors.address?.number)}
                  helperText={formState.errors.address?.number && 'Número é obrigatório'}
                />
              </Box>

              <TextField
                {...register('address.neighborhood', { required: true })}
                label="Bairro"
                variant="outlined"
                fullWidth
                error={Boolean(formState.errors.address?.neighborhood)}
                helperText={formState.errors.address?.neighborhood && 'Bairro é obrigatório'}
              />
              <TextField
                {...register('address.complement')}
                label="Complemento"
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
                  variant="outlined"
                  fullWidth
                  error={Boolean(formState.errors.address?.city)}
                  helperText={formState.errors.address?.city && 'Cidade é obrigatória'}
                />
                <FormControl>
                  <InputLabel id="state">Estado</InputLabel>
                  <Select
                    {...register('address.state', { required: true })}
                    label="Estado"
                    labelId="state"
                    variant="outlined"
                    fullWidth
                    error={Boolean(formState.errors.address?.state)}>
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
                  error={Boolean(formState.errors.address?.country)}
                  helperText={formState.errors.address?.country && 'País é obrigatório'}
                />
              </Box>
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
