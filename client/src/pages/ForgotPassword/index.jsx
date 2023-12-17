import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { forgotPasswordUser } from '@pages/ForgotPassword/actions';
import forgotPasswordImage from '@static/images/forgot-password.svg';
import Button from '@components/Button';
import Input from '@components/Input';
import classes from './style.module.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(forgotPasswordUser(data));
  };

  return (
    <div className={classes.formEmail}>
      <img className={classes.image} src={forgotPasswordImage} alt="test" />

      <div className={classes.form}>
        <div className={classes.title}>
          <FormattedMessage id="forgot_password" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              register={register}
              placeholder="E-mail"
              validationSchema={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
              }}
              required
            />
          </div>
          <Button type="submit" className={classes.btn}>
            <FormattedMessage id="app_submit" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;