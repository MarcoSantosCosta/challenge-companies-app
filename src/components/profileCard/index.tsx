import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Company } from '../../@types/Company';

interface ProfileProps {
  // TO-DO Remover o undefines
  company: Company | null | undefined;
}

const ProfileCard = (props: ProfileProps) => {
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="div">
          {props.company?.tradeName}
        </Typography>
        <Typography variant="body2">CNPJ: {props.company?.cnpj}</Typography>
        <div style={{ display: 'flex', marginBottom: '8px' }}>
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            Endereço:
          </Typography>
          <Typography variant="body2" style={{ marginLeft: '4px' }}>
            Rua: {props.company?.address.street}
          </Typography>
          <Typography variant="body2" style={{ marginLeft: '4px' }}>
            Nº: {props.company?.address.number}
          </Typography>
          <Typography variant="body2" style={{ marginLeft: '4px' }}>
            Bairro: {props.company?.address.neighborhood}
          </Typography>
          {props.company?.address.complement && (
            <Typography variant="body2" style={{ marginLeft: '4px' }}>
              Complemento: {props.company?.address.complement}
            </Typography>
          )}
        </div>
        <Typography variant="body2">Cidade: {props.company?.address.city}</Typography>
        <Typography variant="body2">Estado: {props.company?.address.state}</Typography>
        <Typography variant="body2">País: {props.company?.address.country}</Typography>
        <Typography variant="body2">CEP: {props.company?.address.zipCode}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
