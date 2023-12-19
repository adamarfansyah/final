import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { Register, RegisterValidateOtp, Login } from '@components/Form';
import bgImage from '@static/images/user-login.jpg';
import { encryptData } from '@utils/encrypt';
import { selectToken } from '@containers/Client/selectors';
import dcryptToken from '@utils/dcryptToken';
import LinkCustom from '@components/LinkCustom';
import { selectAuthUser } from './selectors';
import { deleteEmailValidateUser, loginUser, registerUser, validateEmailUser, verifyEmailUser } from './actions';
import RegisterData from './Components/RegisterData';
import classes from './style.module.scss';

const Auth = ({ token, authUser }) => {
  const [isShowLogin, setIsShowLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState(1);
  const decoded = authUser && typeof authUser.token === 'string' ? dcryptToken(authUser.token) : null;
  const expToken = authUser && typeof authUser.exp === 'number' ? authUser.exp : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const onSubmitLogin = (data) => {
    const encryptedPassword = encryptData(data.password);
    dispatch(loginUser({ email: data.email, password: encryptedPassword }));
  };

  const resendOtp = (email) => {
    dispatch(verifyEmailUser({ email }));
  };

  const onSubmitStep1 = (data) => {
    dispatch(
      verifyEmailUser(data, () => {
        setRegisterStep(2);
      })
    );
  };

  const onSubmitStep2 = (data) => {
    const response = { token: authUser.token, otp: data };
    dispatch(
      validateEmailUser(response, () => {
        setRegisterStep(3);
      })
    );
  };

  const onSubmitStep3 = (data) => {
    const { password, confirmPassword } = data;
    const formData = new FormData();
    const encryptedPassword = encryptData(password);
    const encryptedConfirmPassword = encryptData(confirmPassword);

    formData.append('image', data.image[0]);
    formData.append('password', encryptedPassword);
    formData.append('confirmPassword', encryptedConfirmPassword);
    formData.append('email', decoded.email);

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(
      registerUser(formData, () => {
        dispatch(deleteEmailValidateUser());
        setIsShowLogin(true);
        setRegisterStep(1);
      })
    );
  };

  const handleToggleForm = (setup) => {
    setIsShowLogin(setup);
  };

  const RegisterVerification = () => {
    const steps = {
      1: <Register onSubmit={(data) => onSubmitStep1(data)} user={decoded} />,
      2: (
        <RegisterValidateOtp
          onSubmit={(data) => onSubmitStep2(data)}
          user={decoded}
          time={expToken}
          resendOtp={resendOtp}
          blockUrl="/auth"
        />
      ),
      3: <RegisterData onSubmit={(data) => onSubmitStep3(data)} user={decoded} />,
    };

    return steps[registerStep] || null;
  };

  return (
    <div className={classes.authPage}>
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
        <div className={classes.contents}>
          {isShowLogin ? <Login onSubmit={(data) => onSubmitLogin(data)} /> : <RegisterVerification />}
          <div className={classes.links}>
            <LinkCustom to="/auth/merchant" className={classes.link}>
              <FormattedMessage id="app_register_merchant_link" />
            </LinkCustom>
            <LinkCustom to="/forgot-password/user" className={classes.link}>
              <FormattedMessage id="app_forgot_password_user_link" />
            </LinkCustom>
          </div>
        </div>
      </div>
      <img className={classes.image} src={bgImage} alt="background" />
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  authUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  authUser: selectAuthUser,
});

export default connect(mapStateToProps)(Auth);
