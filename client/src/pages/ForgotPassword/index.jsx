import { useDispatch } from 'react-redux';

import { forgotPasswordMerchant, forgotPasswordUser } from '@pages/ForgotPassword/actions';
import ForgotPasswordForm from '@components/Form/ForgotPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ForgotPassword = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (role !== 'user' && role !== 'merchant') {
      navigate('/');
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(forgotPasswordUser(data));
  };

  const onSubmitMerchant = (data) => {
    dispatch(forgotPasswordMerchant(data));
  };

  if (role === 'merchant') {
    return <ForgotPasswordForm onSubmit={onSubmitMerchant} />;
  }

  if (role === 'user') {
    return <ForgotPasswordForm onSubmit={onSubmit} />;
  }
};

export default ForgotPassword;
