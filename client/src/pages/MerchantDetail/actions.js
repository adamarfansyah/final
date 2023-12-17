import { GET_MERCHANT_DETAIL, GET_MERCHANT_DETAIL_SUCCESS } from './constants';

export const getMerchantDetail = (id) => ({
  type: GET_MERCHANT_DETAIL,
  id,
});

export const getMerchantDetailSuccess = (data) => ({
  type: GET_MERCHANT_DETAIL_SUCCESS,
  data,
});
