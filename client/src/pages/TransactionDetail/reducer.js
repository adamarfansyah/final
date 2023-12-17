import { produce } from 'immer';

import {
  GET_PAYMENTS_MERCHANT,
  GET_PAYMENTS_MERCHANT_SUCCESS,
  GET_PAYMENT_DETAIL_MERCHANT,
  GET_PAYMENT_DETAIL_MERCHANT_SUCCESS,
  GET_PAYMENT_DETAIL_USER,
  GET_PAYMENT_DETAIL_USER_SUCCESS,
  GET_PAYMENT_USER,
  GET_PAYMENT_USER_SUCCESS,
} from './constants';

export const initialState = {
  paymentsUser: [],
  paymentDetailUser: {},
  paymentsMerchant: [],
  paymentDetailMerchant: {},
  isLoading: false,
  error: '',
};

const transactionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // USER
      case GET_PAYMENT_USER:
        draft.isLoading = true;
        break;
      case GET_PAYMENT_USER_SUCCESS:
        draft.isLoading = false;
        draft.paymentsUser = action.data;
        break;
      case GET_PAYMENT_DETAIL_USER:
        draft.isLoading = true;
        break;
      case GET_PAYMENT_DETAIL_USER_SUCCESS:
        draft.isLoading = false;
        draft.paymentDetailUser = action.data;
        break;
      // MERCHANT
      case GET_PAYMENTS_MERCHANT:
        draft.isLoading = true;
        break;
      case GET_PAYMENTS_MERCHANT_SUCCESS:
        draft.isLoading = false;
        draft.paymentsMerchant = action.data;
        break;
      case GET_PAYMENT_DETAIL_MERCHANT:
        draft.isLoading = true;
        break;
      case GET_PAYMENT_DETAIL_MERCHANT_SUCCESS:
        draft.isLoading = false;
        draft.paymentDetailMerchant = action.data;
        break;
    }
  });

export default transactionReducer;
