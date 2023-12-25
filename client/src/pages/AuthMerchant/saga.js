import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createMerchantApi,
  loginMerchantApi,
  logoutMerchantApi,
  validateEmailMerchantApi,
  verifyEmailMerchantApi,
} from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import { setLogin, setLoginFailure, setTokenMerchant } from '@containers/Client/actions';
import {
  CREATE_MERCHANT,
  LOGIN_MERCHANT,
  LOGOUT_MERCHANT,
  VALIDATE_EMAIL_MERCHANT,
  VERIFY_EMAIL_MERCHANT,
} from './constants';
import { verifyEmailMerchantSuccess } from './actions';

function* doCreateMerchant({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(createMerchantApi, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doLoginMerchant({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginMerchantApi, data);
    cbSuccess && cbSuccess();
    yield put(setTokenMerchant(response?.data?.accessToken));
    yield put(setLogin(true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
    yield put(setLoginFailure(error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doLogoutMerchant({ cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(logoutMerchantApi);
    yield put(setTokenMerchant(null));
    yield put(setLogin(false));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doVerifyEmailMerchant({ email, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(verifyEmailMerchantApi, email);
    cbSuccess && cbSuccess();
    yield put(verifyEmailMerchantSuccess(response?.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

function* doValidateEmailMerchant({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(validateEmailMerchantApi, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* authMerchantSaga() {
  yield takeLatest(LOGIN_MERCHANT, doLoginMerchant);
  yield takeLatest(CREATE_MERCHANT, doCreateMerchant);
  yield takeLatest(LOGOUT_MERCHANT, doLogoutMerchant);
  yield takeLatest(VERIFY_EMAIL_MERCHANT, doVerifyEmailMerchant);
  yield takeLatest(VALIDATE_EMAIL_MERCHANT, doValidateEmailMerchant);
}
