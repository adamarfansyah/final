import { produce } from 'immer';

import {
  DELETE_EMAIL_VALIDATE_MERCHANT,
  VALIDATE_EMAIL_MERCHANT,
  VALIDATE_EMAIL_MERCHANT_SUCCESS,
  VERIFY_EMAIL_MERCHANT,
  VERIFY_EMAIL_MERCHANT_SUCCESS,
} from './constants';

export const initialState = {
  data: {},
  isLoading: false,
  error: '',
};

export const storedKey = ['data'];

const authMerchantReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case VERIFY_EMAIL_MERCHANT:
        draft.isLoading = true;
        break;
      case VERIFY_EMAIL_MERCHANT_SUCCESS:
        draft.isLoading = false;
        draft.data = action.data;
        break;
      case VALIDATE_EMAIL_MERCHANT:
        draft.isLoading = true;
        break;
      case VALIDATE_EMAIL_MERCHANT_SUCCESS:
        draft.isLoading = false;
        draft.data = action.data;
        break;
      case DELETE_EMAIL_VALIDATE_MERCHANT:
        draft.data = {};
        break;
    }
  });

export default authMerchantReducer;
