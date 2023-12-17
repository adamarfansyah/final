import { UPDATE_FORGOT_PASSWORD_USER, UPDATE_FORGOT_PASSWORD_USER_SUCCESS } from './constants';

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
