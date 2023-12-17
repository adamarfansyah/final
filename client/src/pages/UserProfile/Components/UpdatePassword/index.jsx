import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { updateUserPassword } from '@pages/UserProfile/actions';

import { encryptData } from '@utils/encrypt';
import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    const encryptedPassword = encryptData(data.password);
    const encryptedConfirmPassword = encryptData(data.confirmPassword);

    dispatch(updateUserPassword({ password: encryptedPassword, confirmPassword: encryptedConfirmPassword }));
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
