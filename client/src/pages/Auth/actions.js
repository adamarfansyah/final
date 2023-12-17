import {
  DELETE_EMAIL_VALIDATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  VALIDATE_EMAIL_USER,
  VALIDATE_EMAIL_USER_SUCCESS,
  VERIFY_EMAIL_USER,
  VERIFY_EMAIL_USER_SUCCESS,
} from './constants';

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data,
});

export const registerUser = (data, cbSuccess) => ({
  type: REGISTER_USER,
  data,
  cbSuccess,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const verifyEmailUser = (email, cbSuccess) => ({
  type: VERIFY_EMAIL_USER,
  email,
  cbSuccess,
});

export const verifyEmailUserSuccess = (data) => ({
  type: VERIFY_EMAIL_USER_SUCCESS,
  data,
});

export const validateEmailUser = (data, cbSuccess) => ({
  type: VALIDATE_EMAIL_USER,
  data,
  cbSuccess,
});

export const setValidateEmailUserSuccess = () => ({
  type: VALIDATE_EMAIL_USER_SUCCESS,
});

export const deleteEmailValidateUser = () => ({
  type: DELETE_EMAIL_VALIDATE_USER,
});
