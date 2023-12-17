import { produce } from 'immer';

import {
  DELETE_EMAIL_VALIDATE_USER,
  VALIDATE_EMAIL_USER,
  VALIDATE_EMAIL_USER_SUCCESS,
  VERIFY_EMAIL_USER,
  VERIFY_EMAIL_USER_SUCCESS,
} from './constants';

export const initialState = {
  data: {},
  isLoading: false,
  error: '',
};

export const storedKey = ['data'];

const authUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case VERIFY_EMAIL_USER:
        draft.isLoading = true;
        break;
      case VERIFY_EMAIL_USER_SUCCESS:
        draft.isLoading = false;
        draft.data = action.data;
        break;
      case VALIDATE_EMAIL_USER:
        draft.isLoading = true;
        break;
      case VALIDATE_EMAIL_USER_SUCCESS:
        draft.isLoading = false;
        break;
      case DELETE_EMAIL_VALIDATE_USER:
        draft.data = {};
        break;
    }
  });

export default authUserReducer;
