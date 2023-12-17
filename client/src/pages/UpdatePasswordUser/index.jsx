import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';
import { updateForgotPasswordUser } from './actions';

const UpdatePasswordUser = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      updateForgotPasswordUser(data, token, () => {
        navigate('/auth');
      })
    );
  };

  return (
    <div className={classes.forgotPassword}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="password"
            name="password"
            label="Password"
            errors={errors}
            register={register}
            validationSchema={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            errors={errors}
            validationSchema={{
              required: 'Confirm Password is required',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            }}
            register={register}
            placeholder="Password"
            required
          />
        </div>
        <Button type="submit" className={classes.btn}>
          SUbmit
        </Button>
      </form>
    </div>
  );
};

export default UpdatePasswordUser;
