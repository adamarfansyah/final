import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';
import Input from '@components/Input';

const UpdatePassword = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
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
      <div>
        <Button variant="primary">
          <FormattedMessage id="app_register_title" />
        </Button>
      </div>
    </form>
  );
};

UpdatePassword.propTypes = {
  onSubmit: PropTypes.func,
};

export default UpdatePassword;
