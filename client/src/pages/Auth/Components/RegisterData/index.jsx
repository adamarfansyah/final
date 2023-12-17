import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const RegisterData = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <div className={classes.login}>
      <div className={classes.loginContent}>
        <h1 className={classes.title}>
          <FormattedMessage id="app_register_title" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <Input
              type="text"
              name="firstName"
              label="First name"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'First name is required',
                minLength: { value: 3, message: 'First name must be at least 3 characters' },
              }}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              errors={errors}
              validationSchema={{
                required: 'Last name is required',
                minLength: { value: 3, message: 'Last name must be at least 3 characters' },
              }}
              register={register}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="username"
              label="User Name"
              errors={errors}
              validationSchema={{
                required: 'User name is required',
                minLength: { value: 6, message: 'User name must be at least 6 characters' },
              }}
              register={register}
              placeholder="@username"
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="phoneNumber"
              label="Phone Number"
              errors={errors}
              validationSchema={{
                required: 'Phone Number is required',
                minLength: { value: 6, message: 'Phone Number must be at least 6 characters' },
              }}
              register={register}
              placeholder="08121111111"
              required
            />
          </div>
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
          <div>
            <Input
              type="file"
              name="image"
              label="Profile Image"
              errors={errors}
              register={register}
              onChange={(e) => e.target.files[0]}
              validationSchema={{
                required: 'Profile Image is required',
              }}
              placeholder="Profile Image"
              required
            />
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} variant="primary">
              <FormattedMessage id="app_register_title" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterData.propTypes = {
  onSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(RegisterData);
