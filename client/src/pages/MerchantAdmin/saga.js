import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createMerchantVenueApi,
  deleteMerchantVenueApi,
  getMerchantProfileApi,
  getMerchantVenuesApi,
  updateMerchantProfileApi,
  updateMerchantVenueApi,
} from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';

import {
  CREATE_MERCHANT_VENUE,
  DELETE_MERCHANT_VENUE,
  GET_MERCHANT_PROFILE,
  GET_MERCHANT_VENUES,
  UPDATE_MERCHANT_PROFILE,
  UPDATE_MERCHANT_VENUE,
} from './constants';
import { createMerchantVenueSuccess, getMerchantProfileSuccess, getMerchantVenuesSuccess } from './actions';

function* doGetMerchantProfile() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantProfileApi);
    yield put(getMerchantProfileSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetMerchantVenues() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantVenuesApi);
    yield put(getMerchantVenuesSuccess(response?.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doCreateMerchantVenue({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createMerchantVenueApi, data);
    yield put(createMerchantVenueSuccess(response.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doDeleteMerchantVenue({ id }) {
  yield put(setLoading(true));
  try {
    yield call(deleteMerchantVenueApi, id);
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doUpdateMerchantProfile({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantProfileApi, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* duUpdateMerchantVenue({ id, data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateMerchantVenueApi, id, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* merchantSaga() {
  yield takeLatest(GET_MERCHANT_PROFILE, doGetMerchantProfile);
  yield takeLatest(GET_MERCHANT_VENUES, doGetMerchantVenues);
  yield takeLatest(DELETE_MERCHANT_VENUE, doDeleteMerchantVenue);
  yield takeLatest(UPDATE_MERCHANT_PROFILE, doUpdateMerchantProfile);
  yield takeLatest(UPDATE_MERCHANT_VENUE, duUpdateMerchantVenue);
  yield takeLatest(CREATE_MERCHANT_VENUE, doCreateMerchantVenue);
}
