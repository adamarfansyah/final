import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Register, RegisterValidateOtp, Login } from '@components/Form';

import { encryptData } from '@utils/encrypt';
import { selectLoginFailure } from '@containers/Client/selectors';
import LinkCustom from '@components/LinkCustom';
import dcryptToken from '@utils/dcryptToken';
import { selectCategories } from '@pages/Venue/selectors';
import { getCategories } from '@pages/Venue/actions';
import { selectLocation } from '@containers/App/selectors';
import {
  createMerchant,
  deleteEmailValidateMerchant,
  loginMerchant,
  validateEmailMerchant,
  verifyEmailMerchant,
} from './actions';
import RegisterData from './Components/RegisterData';
import classes from './style.module.scss';
import { selectAuthMerchant } from './selectors';

const AuthMerchant = ({ authMerchant, error, categories, location }) => {
  const [isShowLogin, setIsShowLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState(3);
  const decoded = authMerchant && typeof authMerchant.token === 'string' ? dcryptToken(authMerchant.token) : null;
  const expToken = authMerchant && typeof authMerchant.exp === 'number' ? authMerchant.exp : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const resendOtp = (email) => {
    dispatch(verifyEmailMerchant({ email }));
  };

  const onSubmitLogin = (data) => {
    const encryptedPassword = encryptData(data.password);
    dispatch(
      loginMerchant({ email: data.email, password: encryptedPassword }, () => {
        navigate('/merchant/profile');
      })
    );
  };

  const onSubmitStep1 = (data) => {
    dispatch(
      verifyEmailMerchant(data, () => {
        setRegisterStep(2);
      })
    );
  };

  const onSubmitStep2 = (data) => {
    const response = { token: authMerchant.token, otp: data };
    dispatch(
      validateEmailMerchant(response, () => {
        setRegisterStep(3);
      })
    );
  };

  const onSubmitStep3 = (data) => {
    const { password, confirmPassword } = data;
    const encryptedPassword = encryptData(password);
    const encryptedConfirmPassword = encryptData(confirmPassword);

    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('password', encryptedPassword);
    formData.append('confirmPassword', encryptedConfirmPassword);
    formData.append('email', decoded.email);
    formData.append('token', authMerchant.token);

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(
      createMerchant(formData, () => {
        dispatch(deleteEmailValidateMerchant());
        setRegisterStep(1);
        setIsShowLogin(true);
      })
    );
  };

  const handleToggleForm = (setup) => {
    setIsShowLogin(setup);
  };

  const RegisterVerification = () => {
    const steps = {
      1: <Register onSubmit={(data) => onSubmitStep1(data)} merchant={decoded} />,
      2: (
        <RegisterValidateOtp
          onSubmit={(data) => onSubmitStep2(data)}
          user={decoded}
          time={expToken}
          resendOtp={resendOtp}
          blockUrl="/auth/merchant"
        />
      ),
      3: <RegisterData onSubmit={(data) => onSubmitStep3(data)} categories={categories} location={location} />,
    };

    return steps[registerStep] || null;
  };

  return (
    <div className={classes.bgAuth}>
      <div className={classes.auth}>
        <div className={classes.authShow}>
          <div
            className={classNames(classes.authShowCard, { [classes.active]: isShowLogin })}
            onClick={() => handleToggleForm(true)}
          >
            <FormattedMessage id="app_login_title" />
          </div>
          <div
            className={classNames(classes.authShowCard, { [classes.active]: !isShowLogin })}
            onClick={() => handleToggleForm(false)}
          >
            <FormattedMessage id="app_register_title" />
          </div>
        </div>
        <div className={classes.content}>
          {isShowLogin ? <Login onSubmit={(data) => onSubmitLogin(data)} error={error} /> : <RegisterVerification />}
          <div className={classes.links}>
            <LinkCustom to="/auth">
              <FormattedMessage id="app_register_user_link" />
            </LinkCustom>
            <LinkCustom to="/forgot-password/merchant" className={classes.link}>
              <FormattedMessage id="app_forgot_password_user_link" />
            </LinkCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthMerchant.propTypes = {
  authMerchant: PropTypes.object,
  error: PropTypes.string,
  categories: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authMerchant: selectAuthMerchant,
  error: selectLoginFailure,
  categories: selectCategories,
  location: selectLocation,
});

export default connect(mapStateToProps)(AuthMerchant);
