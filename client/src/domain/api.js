import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  auth: 'auth',
  authMerchant: 'auth-merchant',
  merchant: 'merchant',
  category: 'category',
  venue: 'venue',
  user: 'user',
  payment: 'transaction',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
    withCredentials: true,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

// AUTH
export const loginApi = (data) => callAPI(`${urls.auth}/login`, 'POST', {}, {}, data);
export const logoutApi = () => callAPI(`${urls.auth}/logout`, 'POST', {}, {}, {});
export const registerUserApi = (data) => callAPI(`${urls.auth}/register`, 'POST', {}, {}, data);
export const refreshTokenApi = () => callAPI(`${urls.auth}/refresh-token`, 'GET');
export const verifyEmailUserApi = (data) => callAPI(`${urls.auth}/verify-email`, 'POST', {}, {}, data);
export const validateEmailUserApi = (data) => callAPI(`${urls.auth}/validate-email`, 'POST', {}, {}, data);
export const forgotPasswordUserApi = (email) => callAPI(`${urls.auth}/forgot-password`, 'POST', {}, {}, email);
export const updateForgotPasswordUserApi = (data, token) =>
  callAPI(`${urls.auth}/update-forgot-password/${token}`, 'POST', {}, {}, data);

// AUTH MERCHANT
export const createMerchantApi = (data) => callAPI(`${urls.authMerchant}/register`, 'POST', {}, {}, data);
export const loginMerchantApi = (data) => callAPI(`${urls.authMerchant}/login`, 'POST', {}, {}, data);
export const logoutMerchantApi = () => callAPI(`${urls.authMerchant}/logout`, 'POST', {}, {}, {});
export const verifyEmailMerchantApi = (data) => callAPI(`${urls.authMerchant}/verify-email`, 'POST', {}, {}, data);
export const validateEmailMerchantApi = (data) => callAPI(`${urls.authMerchant}/validate-email`, 'POST', {}, {}, data);
export const forgotPasswordMerchantApi = (email) =>
  callAPI(`${urls.authMerchant}/forgot-password`, 'POST', {}, {}, email);
export const updateForgotPasswordMerchantApi = (data, token) =>
  callAPI(`${urls.authMerchant}/update-forgot-password/${token}`, 'POST', {}, {}, data);

// MERCHANT
export const getMerchantsApi = () => callAPI(urls.merchant, 'GET');
export const getMerchantProfileApi = () => callAPI(`${urls.merchant}/merchant-profile`, 'GET');
export const updateMerchantProfileApi = (data) => callAPI(`${urls.merchant}/update-profile`, 'PATCH', {}, {}, data);
export const updateMerchantPasswordApi = (data) => callAPI(`${urls.merchant}/update-password`, 'PATCH', {}, {}, data);
export const getMerchantDetailApi = (id) => callAPI(`${urls.merchant}/${id}`, 'GET');
export const deleteMerchantApi = () => callAPI(`${urls.merchant}/delete`, 'DELETE');

// CATEGORIES
export const getCategoriesApi = () => callAPI(urls.category, 'GET');

// VENUES
export const getMerchantVenuesApi = () => callAPI(`${urls.venue}/merchant-venue`, 'GET');
export const getOperationalVenueApi = (id) => callAPI(`${urls.venue}/operational/${id}`, 'GET');
export const createBookingApi = (data) => callAPI(`${urls.venue}/booking`, 'POST', {}, {}, data);
export const createMerchantVenueApi = (data) => callAPI(`${urls.venue}/create-venue`, 'POST', {}, {}, data);
export const updateMerchantVenueApi = (id, data) => callAPI(`${urls.venue}/update-venue/${id}`, 'PUT', {}, {}, data);
export const deleteMerchantVenueApi = (id) => callAPI(`${urls.venue}/delete-venue/${id}`, 'DELETE', {}, {}, {});
export const getMerchantVenueOperationalApi = (id) => callAPI(`${urls.venue}/venue/${id}`, 'GET');

// PAYMENT
export const createTokenPaymentApi = (data) => callAPI(`${urls.payment}/payment-token`, 'POST', {}, {}, data);
export const createPaymentApi = (data) => callAPI(`${urls.payment}/payment`, 'POST', {}, {}, data);
export const getPaymentsByUserApi = () => callAPI(`${urls.payment}/payment-user`, 'GET');
export const getPaymentsByMerchantApi = () => callAPI(`${urls.payment}/payment-merchant`, 'GET');
export const sendEmailAfterPaymentApi = (data) => callAPI(`${urls.payment}/send-email`, 'POST', {}, {}, data);
export const getPaymentDetailByUserApi = (id) => callAPI(`${urls.payment}/payment-user/${id}`, 'GET');
export const getPaymentDetailByMerchantApi = (id) => callAPI(`${urls.payment}/payment-merchant/${id}`, 'GET');

// USER
export const getUserProfileApi = () => callAPI(`${urls.user}/profile`, 'GET');
export const updateUserProfileApi = (data) => callAPI(`${urls.user}/update-profile`, 'PUT', {}, {}, data);
export const updateUserPasswordApi = (data) => callAPI(`${urls.user}/update-password`, 'PATCH', {}, {}, data);
