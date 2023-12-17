import {
  CREATE_MERCHANT_VENUE,
  CREATE_MERCHANT_VENUE_SUCCESS,
  DELETE_MERCHANT,
  DELETE_MERCHANT_VENUE,
  GET_MERCHANT_PROFILE,
  GET_MERCHANT_PROFILE_SUCCESS,
  GET_MERCHANT_VENUES,
  GET_MERCHANT_VENUES_SUCCESS,
  UPDATE_MERCHANT_PASSWORD,
  UPDATE_MERCHANT_PROFILE,
  UPDATE_MERCHANT_PROFILE_SUCCESS,
  UPDATE_MERCHANT_VENUE,
  UPDATE_MERCHANT_VENUE_SUCCESS,
} from './constants';

export const getMerchantProfile = () => ({
  type: GET_MERCHANT_PROFILE,
});

export const getMerchantProfileSuccess = (data) => ({
  type: GET_MERCHANT_PROFILE_SUCCESS,
  data,
});

export const getMerchantVenues = () => ({
  type: GET_MERCHANT_VENUES,
});

export const getMerchantVenuesSuccess = (venues) => ({
  type: GET_MERCHANT_VENUES_SUCCESS,
  venues,
});

export const updateMerchantProfile = (data, cbSuccess) => ({
  type: UPDATE_MERCHANT_PROFILE,
  data,
  cbSuccess,
});

export const updateMerchantProfileSuccess = (data) => ({
  type: UPDATE_MERCHANT_PROFILE_SUCCESS,
  data,
});

export const updateMerchantPassword = (data) => ({
  type: UPDATE_MERCHANT_PASSWORD,
  data,
});

export const createMerchantVenue = (data, cbSuccess) => ({
  type: CREATE_MERCHANT_VENUE,
  data,
  cbSuccess,
});

export const createMerchantVenueSuccess = (data) => ({
  type: CREATE_MERCHANT_VENUE_SUCCESS,
  data,
});

export const updateMerchantVenue = (id, data, cbSuccess) => ({
  type: UPDATE_MERCHANT_VENUE,
  id,
  data,
  cbSuccess,
});

export const updateMerchantVenueSuccess = (data) => ({
  type: UPDATE_MERCHANT_VENUE_SUCCESS,
  data,
});

export const deleteMerchant = (cbSuccess) => ({
  type: DELETE_MERCHANT,
  cbSuccess,
});

export const deleteMerchantVenue = (id) => ({
  type: DELETE_MERCHANT_VENUE,
  id,
});
