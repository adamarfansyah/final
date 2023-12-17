import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const Login = ({ onSubmit, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={classes.login}>
      <div className={classes.loginContent}>
        <h1 className={classes.title}>
          <FormattedMessage id="app_login_title" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              errorResponse={error}
              register={register}
              placeholder="E-mail"
              validationSchema={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
              }}
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
              placeholder="Password"
              validationSchema={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              }}
              required
            />
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.btn} variant="primary">
              <FormattedMessage id="app_login_title" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Login);
