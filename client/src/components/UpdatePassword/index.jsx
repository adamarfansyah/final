import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const UpdatePassword = ({ onSubmit, forgotPassword = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {!forgotPassword && (
        <div>
          <Input
            type="password"
            name="oldPassword"
            label="Your Password"
            errors={errors}
            validationSchema={{
              required: 'old Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            register={register}
            placeholder="Your Password"
            required
          />
        </div>
      )}
      <div>
        <Input
          type="password"
          name="password"
          label="New Password"
          errors={errors}
          validationSchema={{
            required: 'New Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          }}
          register={register}
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
          placeholder="Confirm Password"
          required
        />
      </div>
      <div className={classes.btnContainer}>
        <Button className={classes.btn} variant="primary">
          <FormattedMessage id="app_submit" />
        </Button>
      </div>
    </form>
  );
};

UpdatePassword.propTypes = {
  onSubmit: PropTypes.func,
  forgotPassword: PropTypes.bool,
};

export default UpdatePassword;
