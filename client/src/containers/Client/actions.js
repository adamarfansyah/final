import {
  SET_LOGIN,
  SET_LOGIN_FAILURE,
  SET_REFRESH_TOKEN,
  SET_TOKEN,
  SET_TOKEN_MERCHANT,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setLoginFailure = (error) => ({
  type: SET_LOGIN_FAILURE,
  error,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setTokenMerchant = (token) => ({
  type: SET_TOKEN_MERCHANT,
  token,
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  refreshToken,
});
