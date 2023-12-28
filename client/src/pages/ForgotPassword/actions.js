import {
  FORGOT_PASSWORD_MERCHANT,
  FORGOT_PASSWORD_MERCHANT_SUCCESS,
  FORGOT_PASSWORD_USER,
  FORGOT_PASSWORD_USER_SUCCESS,
} from './constants';

export const forgotPasswordUser = (email) => ({
  type: FORGOT_PASSWORD_USER,
  email,
});

export const forgotPasswordUserSuccess = (data) => ({
  type: FORGOT_PASSWORD_USER_SUCCESS,
  data,
});
export const forgotPasswordMerchant = (email) => ({
  type: FORGOT_PASSWORD_MERCHANT,
  email,
});

export const forgotPasswordMerchantSuccess = (data) => ({
  type: FORGOT_PASSWORD_MERCHANT_SUCCESS,
  data,
});
