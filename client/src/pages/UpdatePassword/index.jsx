import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { encryptData } from '@utils/encrypt';

import UpdatePassword from '@components/UpdatePassword';
import { updateForgotPasswordMerchant, updateForgotPasswordUser } from './actions';
import classes from './style.module.scss';

const UpdatePasswordPage = () => {
  const { role, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'user' && role !== 'merchant') {
      navigate('/');
    }
  }, []);

  const onSubmitUser = (data) => {
    const encryptedPassword = encryptData(data.password);
    const encryptedConfirmPassword = encryptData(data.confirmPassword);
    dispatch(
      updateForgotPasswordUser(
        { password: encryptedPassword, confirmPassword: encryptedConfirmPassword },
        token,
        () => {
          navigate('/auth');
        }
      )
    );
  };

  const onSubmitMerchant = (data) => {
    const encryptedPassword = encryptData(data.password);
    const encryptedConfirmPassword = encryptData(data.confirmPassword);
    dispatch(
      updateForgotPasswordMerchant(
        { password: encryptedPassword, confirmPassword: encryptedConfirmPassword },
        token,
        () => {
          navigate('/auth/merchant');
        }
      )
    );
  };

  if (role === 'user') {
    return (
      <div className={classes.forgotPassword}>
        <img className={classes.image} src="/error.svg" alt="test" />
        <UpdatePassword onSubmit={(data) => onSubmitUser(data)} forgotPassword />
      </div>
    );
  }

  if (role === 'merchant') {
    return (
      <div className={classes.forgotPassword}>
        <img className={classes.image} src="/error.svg" alt="test" />
        <UpdatePassword onSubmit={(data) => onSubmitMerchant(data)} forgotPassword />
      </div>
    );
  }

  return <h1>something wrong</h1>;
};

export default UpdatePasswordPage;
