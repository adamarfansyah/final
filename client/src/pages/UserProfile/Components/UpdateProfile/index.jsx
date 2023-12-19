import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { updateUserProfile } from '@pages/UserProfile/actions';

import Input from '@components/Input';
import Button from '@components/Button';
import classes from './style.module.scss';

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image[0]);

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(updateUserProfile(formData));
    }
  };

  return (
    <div className={classes.updateProfile}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <Input
            type="text"
            name="username"
            label="Username"
            errors={errors}
            validationSchema={{
              required: 'Username is required',
              pattern: { value: 3, message: 'Username must be at least 3 characters' },
            }}
            register={register}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="firstName"
            label="First Name"
            errors={errors}
            validationSchema={{
              required: 'First Name is required',
              pattern: { value: 3, message: 'First Name must be at least 3 characters' },
            }}
            register={register}
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
              required: 'Last Name is required',
              pattern: { value: 3, message: 'Last Name must be at least 3 characters' },
            }}
            register={register}
            placeholder="Last Name"
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
              pattern: { value: 3, message: 'Phone Number must be at least 3 characters' },
            }}
            register={register}
            placeholder="Phone Number"
            required
          />
        </div>
        <div>
          <Input
            type="file"
            name="image"
            label="Profile Image"
            errors={errors}
            validationSchema={{
              required: 'Profile Image is required',
              pattern: { value: 3, message: 'Profile Image must be at least 3 characters' },
            }}
            register={register}
            placeholder="Profile Image"
            required
          />
        </div>
        <div className={classes.btnContainer}>
          <Button className={classes.btn} variant="primary">
            <FormattedMessage id="app_submit" />
          </Button>
        </div>
      </form>
    </div>
  );
};

UpdateProfile.propTypes = {
  user: PropTypes.object,
};

export default UpdateProfile;
