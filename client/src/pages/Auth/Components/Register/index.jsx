import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const Register = ({ onSubmit, error, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  return (
    <div className={classes.login}>
      <div className={classes.loginContent}>
        <h1 className={classes.title}>
          <FormattedMessage id="app_register_title" />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              errorResponse={error}
              validationSchema={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
              }}
              register={register}
              placeholder="E-mail"
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

Register.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Register);
