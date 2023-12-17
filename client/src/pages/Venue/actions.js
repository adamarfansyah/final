import {
  CREATE_PAYMENT,
  CREATE_TOKEN_PAYMENT,
  GET_CATEGORIES,
  GET_MERCHANTS,
  GET_VENUE_DETAIL,
  GET_VENUE_SCHEDULE,
  GET_VENUE_SCHEDULE_SUCCESS,
  SEND_EMAIL_PAYMENT,
  SET_CATEGORIES,
  SET_MERCHANTS,
} from './constants';

export const getMerchants = () => ({
  type: GET_MERCHANTS,
});

export const setMerchants = (data) => ({
  type: SET_MERCHANTS,
  data,
});

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const setCategories = (data) => ({
  type: SET_CATEGORIES,
  data,
});

export const getVenueDetail = (id) => ({
  type: GET_VENUE_DETAIL,
  id,
});

export const getVenueDetailSuccess = (data) => ({
  type: GET_VENUE_DETAIL,
  data,
});

export const getVenueSchedule = (id) => ({
  type: GET_VENUE_SCHEDULE,
  id,
});

export const getVenueScheduleSuccess = (data) => ({
  type: GET_VENUE_SCHEDULE_SUCCESS,
  data,
});

export const createTokenPayment = (data, merchantId, cbSuccess) => ({
  type: CREATE_TOKEN_PAYMENT,
  data,
  merchantId,
  cbSuccess,
});

export const createPayment = (data, cbSuccess) => ({
  type: CREATE_PAYMENT,
  data,
  cbSuccess,
});

export const sendEmailPayment = (data) => ({
  type: SEND_EMAIL_PAYMENT,
  data,
});
