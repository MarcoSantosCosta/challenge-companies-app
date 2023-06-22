import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Company } from '../../@types/Company';

interface ProfileProps {
  // TO-DO Remover o undefines
  company: Company | null | undefined;
}

const ProfileCard = (props: ProfileProps) => {
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Typography variant="h5" component="div">
          {props.company?.tradeName}
        </Typography>
        <Typography variant="body2">CNPJ: {props.company?.cnpj}</Typography>
        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
          Endereço:
        </Typography>
        <Box sx={{ display: 'flex', marginBottom: '8px', gap: 5 }}>
          <Typography variant="body2">Rua: {props.company?.address.street}</Typography>
          <Typography variant="body2">Nº: {props.company?.address.number}</Typography>
          <Typography variant="body2">Bairro: {props.company?.address.neighborhood}</Typography>
          {props.company?.address.complement && (
            <Typography variant="body2">
              Complemento: {props.company?.address.complement}
            </Typography>
          )}

          <Typography variant="body2">Cidade: {props.company?.address.city}</Typography>
          <Typography variant="body2">Estado: {props.company?.address.state}</Typography>
          <Typography variant="body2">País: {props.company?.address.country}</Typography>
          <Typography variant="body2">CEP: {props.company?.address.zipCode}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
