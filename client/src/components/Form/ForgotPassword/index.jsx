import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import forgotPasswordImage from '@static/images/forgot-password.svg';
import Button from '@components/Button';
import Input from '@components/Input';
import classes from './style.module.scss';

const ForgotPasswordForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={classes.formEmail}>
      <img className={classes.image} src={forgotPasswordImage} alt="forgot-password" />
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

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ForgotPasswordForm;
