import { FORGOT_PASSWORD_USER, FORGOT_PASSWORD_USER_SUCCESS } from './constants';

export const forgotPasswordUser = (email) => ({
  type: FORGOT_PASSWORD_USER,
  email,
});

export const forgotPasswordUserSuccess = (data) => ({
  type: FORGOT_PASSWORD_USER_SUCCESS,
  data,
});
