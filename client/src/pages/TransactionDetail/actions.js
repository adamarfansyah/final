import {
  GET_PAYMENT_USER,
  GET_PAYMENT_USER_SUCCESS,
  GET_PAYMENT_DETAIL_USER,
  GET_PAYMENT_DETAIL_USER_SUCCESS,
  GET_PAYMENTS_MERCHANT,
  GET_PAYMENTS_MERCHANT_SUCCESS,
  GET_PAYMENT_DETAIL_MERCHANT,
  GET_PAYMENT_DETAIL_MERCHANT_SUCCESS,
} from './constants';

export const getPaymentByUser = () => ({
  type: GET_PAYMENT_USER,
});

export const getPaymentByUserSuccess = (data) => ({
  type: GET_PAYMENT_USER_SUCCESS,
  data,
});

export const getPaymentDetailByUser = (transactionId) => ({
  type: GET_PAYMENT_DETAIL_USER,
  transactionId,
});

export const getPaymentDetailByUserSuccess = (data) => ({
  type: GET_PAYMENT_DETAIL_USER_SUCCESS,
  data,
});

export const getPaymentsByMerchant = () => ({
  type: GET_PAYMENTS_MERCHANT,
});

export const getPaymentsByMerchantSuccess = (data) => ({
  type: GET_PAYMENTS_MERCHANT_SUCCESS,
  data,
});

export const getPaymentDetailByMerchant = (transactionId) => ({
  type: GET_PAYMENT_DETAIL_MERCHANT,
  transactionId,
});

export const getPaymentDetailByMerchantSuccess = (data) => ({
  type: GET_PAYMENT_DETAIL_MERCHANT_SUCCESS,
  data,
});
