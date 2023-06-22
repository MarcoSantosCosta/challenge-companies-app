import { Button } from '@mui/material';
import { useDelete } from '../../../hooks/useDelete';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface DeleteCompanyProps {
  id: number | undefined;
}

const DeleteCompany = (props: DeleteCompanyProps) => {
  const { isLoading, error, success, perform } = useDelete('company');
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.errorMessages) {
      error.errorMessages.forEach((errorMessages) => {
        const { message } = errorMessages;
        toast.error(message);
      });
    } else if (success) {
      toast.success('Empresa removida com sucesso');
      setTimeout(() => {
        navigate('/company');
      }, 200);
    }
  }, [error, success]);

  const handleClick = () => {
    if (props.id) {
      perform(props.id);
    }
  };
  return (
    <Button onClick={handleClick} variant="contained" disabled={Boolean(props.id) && isLoading}>
      Exluir
    </Button>
  );
};

export default DeleteCompany;
