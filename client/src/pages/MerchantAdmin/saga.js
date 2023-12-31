import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createMerchantVenueApi,
  deleteMerchantApi,
  deleteMerchantVenueApi,
  getMerchantProfileApi,
  getMerchantVenueOperationalApi,
  getMerchantVenuesApi,
  updateMerchantImageApi,
  updateMerchantPasswordApi,
  updateMerchantProfileApi,
  updateMerchantVenueApi,
  updateMerchantVenueImageApi,
} from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';

import {
  CREATE_MERCHANT_VENUE,
  DELETE_MERCHANT,
  DELETE_MERCHANT_VENUE,
  GET_MERCHANT_PROFILE,
  GET_MERCHANT_VENUES,
  GET_MERCHANT_VENUE_OPERATIONAL,
  UPDATE_MERCHANT_IMAGE,
  UPDATE_MERCHANT_PASSWORD,
  UPDATE_MERCHANT_PROFILE,
  UPDATE_MERCHANT_VENUE,
  UPDATE_MERCHANT_VENUE_IMAGE,
} from './constants';
import {
  createMerchantVenueSuccess,
  getMerchantProfileSuccess,
  getMerchantVenueOperationalSuccess,
  getMerchantVenuesSuccess,
} from './actions';

function* doGetMerchantProfile() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantProfileApi);
    yield put(getMerchantProfileSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doGetMerchantOperational({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantVenueOperationalApi, id);
    yield put(getMerchantVenueOperationalSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doGetMerchantVenues() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantVenuesApi);
    yield put(getMerchantVenuesSuccess(response?.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doCreateMerchantVenue({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createMerchantVenueApi, data);
    yield put(createMerchantVenueSuccess(response.data));
    cbSuccess && cbSuccess();
    yield put(showPopup('Success Create Venue', 'Please Refresh Page for best experience', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doDeleteMerchantVenue({ id, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(deleteMerchantVenueApi, id);
    cbSuccess && cbSuccess();
    yield put(showPopup('Success Delete Venue', 'Please Refresh Page for best experience', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantProfile({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantProfileApi, data);
    yield put(showPopup('Success Update Profile', 'Please Refresh your page for best experience', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantPassword({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantPasswordApi, data);
    yield put(showPopup('Success Update Password', 'Please Refresh your page for best experience', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantImage({ image, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantImageApi, image);
    yield put(showPopup('Success Update Image', 'Please Refresh your page for best experience', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantVenueImage({ id, image, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantVenueImageApi, id, image);
    yield put(showPopup('Success Update Image', 'Please Refresh your page for best experience', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantVenue({ id, data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantVenueApi, id, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doDeleteMerchant({ cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(deleteMerchantApi);
    yield put(showPopup('Thank you!', 'Thank you for being our partner we hope you well!', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

export default function* merchantSaga() {
  yield takeLatest(GET_MERCHANT_PROFILE, doGetMerchantProfile);
  yield takeLatest(GET_MERCHANT_VENUES, doGetMerchantVenues);
  yield takeLatest(DELETE_MERCHANT_VENUE, doDeleteMerchantVenue);
  yield takeLatest(UPDATE_MERCHANT_PROFILE, doUpdateMerchantProfile);
  yield takeLatest(UPDATE_MERCHANT_PASSWORD, doUpdateMerchantPassword);
  yield takeLatest(UPDATE_MERCHANT_IMAGE, doUpdateMerchantImage);
  yield takeLatest(UPDATE_MERCHANT_VENUE_IMAGE, doUpdateMerchantVenueImage);
  yield takeLatest(UPDATE_MERCHANT_VENUE, doUpdateMerchantVenue);
  yield takeLatest(CREATE_MERCHANT_VENUE, doCreateMerchantVenue);
  yield takeLatest(DELETE_MERCHANT, doDeleteMerchant);
  yield takeLatest(GET_MERCHANT_VENUE_OPERATIONAL, doGetMerchantOperational);
}
