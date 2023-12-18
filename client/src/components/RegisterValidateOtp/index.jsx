import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import Countdown from 'react-countdown';
import Button from '@components/Button';
import Input from '@components/Input';
import classes from './style.module.scss';

const RegisterValidateOtp = ({ user, onSubmit, time, resendOtp, blockUrl }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate(blockUrl);
    }
  }, [user]);

  const handleResend = () => {
    resendOtp(user.email);
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            name="otp"
            label="OTP"
            errors={errors}
            register={register}
            validationSchema={{
              required: 'OTP is required',
              minLength: { value: 3, message: 'OTP must be at least 3 characters' },
            }}
            placeholder="OTP"
            required
          />
          <Button type="submit">
            <FormattedMessage id="app_submit" />
          </Button>
        </div>
      </form>
      <div className={classes.times}>
        <Countdown date={time}>
          <Button variant="secondary" className={classes.btnRetry} onClick={handleResend}>
            <FormattedMessage id="resend_otp" />
          </Button>
        </Countdown>
      </div>
    </div>
  );
};

RegisterValidateOtp.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  time: PropTypes.string,
  resendOtp: PropTypes.func,
  blockUrl: PropTypes.string,
};

export default RegisterValidateOtp;
