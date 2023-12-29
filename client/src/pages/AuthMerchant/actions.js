import {
  CREATE_MERCHANT,
  DELETE_EMAIL_VALIDATE_MERCHANT,
  LOGIN_MERCHANT,
  LOGOUT_MERCHANT,
  VALIDATE_EMAIL_MERCHANT,
  VALIDATE_EMAIL_MERCHANT_SUCCESS,
  VERIFY_EMAIL_MERCHANT,
  VERIFY_EMAIL_MERCHANT_SUCCESS,
} from './constants';

export const createMerchant = (data, cbSuccess) => ({
  type: CREATE_MERCHANT,
  data,
  cbSuccess,
});

export const logoutMerchant = (cbSuccess) => ({
  type: LOGOUT_MERCHANT,
  cbSuccess,
});

export const loginMerchant = (data, cbSuccess) => ({
  type: LOGIN_MERCHANT,
  data,
  cbSuccess,
});

export const verifyEmailMerchant = (email, cbSuccess) => ({
  type: VERIFY_EMAIL_MERCHANT,
  email,
  cbSuccess,
});

export const verifyEmailMerchantSuccess = (data) => ({
  type: VERIFY_EMAIL_MERCHANT_SUCCESS,
  data,
});

export const validateEmailMerchant = (data, cbSuccess) => ({
  type: VALIDATE_EMAIL_MERCHANT,
  data,
  cbSuccess,
});

export const validateEmailMerchantSuccess = (data) => ({
  type: VALIDATE_EMAIL_MERCHANT_SUCCESS,
  data,
});

export const deleteEmailValidateMerchant = () => ({
  type: DELETE_EMAIL_VALIDATE_MERCHANT,
});
