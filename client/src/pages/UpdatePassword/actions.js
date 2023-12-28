import {
  UPDATE_FORGOT_PASSWORD_MERCHANT,
  UPDATE_FORGOT_PASSWORD_MERCHANT_SUCCESS,
  UPDATE_FORGOT_PASSWORD_USER,
  UPDATE_FORGOT_PASSWORD_USER_SUCCESS,
} from './constants';

export const updateForgotPasswordUser = (data, token, cbSuccess) => ({
  type: UPDATE_FORGOT_PASSWORD_USER,
  data,
  token,
  cbSuccess,
});

export const updateForgotPasswordUserSuccess = (data) => ({
  type: UPDATE_FORGOT_PASSWORD_USER_SUCCESS,
  data,
});

export const updateForgotPasswordMerchant = (data, token, cbSuccess) => ({
  type: UPDATE_FORGOT_PASSWORD_MERCHANT,
  data,
  token,
  cbSuccess,
});

export const updateForgotPasswordMerchantSuccess = (data) => ({
  type: UPDATE_FORGOT_PASSWORD_MERCHANT_SUCCESS,
  data,
});
