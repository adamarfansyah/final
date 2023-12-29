import {
  CREATE_MERCHANT_VENUE,
  CREATE_MERCHANT_VENUE_SUCCESS,
  DELETE_MERCHANT,
  DELETE_MERCHANT_VENUE,
  DELETE_VENUE_OPERATIONAL,
  GET_MERCHANT_PROFILE,
  GET_MERCHANT_PROFILE_SUCCESS,
  GET_MERCHANT_VENUES,
  GET_MERCHANT_VENUES_SUCCESS,
  GET_MERCHANT_VENUE_OPERATIONAL,
  GET_MERCHANT_VENUE_OPERATIONAL_SUCCESS,
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

export const createMerchantVenue = (data, cbSuccess, cbFailure) => ({
  type: CREATE_MERCHANT_VENUE,
  data,
  cbSuccess,
  cbFailure,
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

export const deleteMerchantVenue = (id, cbSuccess) => ({
  type: DELETE_MERCHANT_VENUE,
  id,
  cbSuccess,
});

export const getMerchantVenueOperational = (id) => ({
  type: GET_MERCHANT_VENUE_OPERATIONAL,
  id,
});

export const getMerchantVenueOperationalSuccess = (data) => ({
  type: GET_MERCHANT_VENUE_OPERATIONAL_SUCCESS,
  data,
});

export const deleteVenueOperational = (venueId) => ({
  type: DELETE_VENUE_OPERATIONAL,
  venueId,
});
