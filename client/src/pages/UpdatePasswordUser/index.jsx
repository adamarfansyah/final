import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import UpdatePassword from '@components/UpdatePassword';
import classes from './style.module.scss';
import { updateForgotPasswordUser } from './actions';

const UpdatePasswordUser = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(
      updateForgotPasswordUser(data, token, () => {
        navigate('/auth');
      })
    );
  };

  return (
    <div className={classes.forgotPassword}>
      <img className={classes.image} src="/error.svg" alt="test" />
      <UpdatePassword onSubmit={(data) => onSubmit(data)} />
    </div>
  );
};

export default UpdatePasswordUser;
