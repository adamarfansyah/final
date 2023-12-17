import { produce } from 'immer';

import {
  SET_LOGIN,
  SET_LOGIN_FAILURE,
  SET_REFRESH_TOKEN,
  SET_TOKEN,
  SET_TOKEN_MERCHANT,
} from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  tokenMerchant: null,
  refreshToken: null,
  error: null,
};

export const storedKey = ['token', 'login', 'tokenMerchant'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_LOGIN_FAILURE:
        draft.error = action.error;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_TOKEN_MERCHANT:
        draft.tokenMerchant = action.token;
        break;
      case SET_REFRESH_TOKEN:
        draft.refreshToken = action.refreshToken;
        break;
    }
  });

export default clientReducer;
