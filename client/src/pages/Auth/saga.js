import { call, put, takeLatest } from 'redux-saga/effects';

import { loginApi, logoutApi, registerUserApi, validateEmailUserApi, verifyEmailUserApi } from '@domain/api';

import { setLogin, setLoginFailure, setToken } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, VALIDATE_EMAIL_USER, VERIFY_EMAIL_USER } from './constants';
import { setValidateEmailUserSuccess, verifyEmailUserSuccess } from './actions';

function* doLoginUser({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, data);
    yield put(setToken(response?.data?.accessToken));
    yield put(setLogin(true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
    yield put(setLoginFailure(error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doLogoutUser() {
  yield put(setLoading(true));
  try {
    yield call(logoutApi);
    yield put(setToken(null));
    yield put(setLogin(false));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doRegisterUser({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(registerUserApi, data);
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doVerifyEmailUser({ email, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(verifyEmailUserApi, email);
    cbSuccess && cbSuccess();
    yield put(verifyEmailUserSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doValidateEmailUser({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(validateEmailUserApi, data);
    yield put(setValidateEmailUserSuccess(response.data));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.message));
  }
  yield put(setLoading(false));
}

export default function* authUserSaga() {
  yield takeLatest(LOGIN_USER, doLoginUser);
  yield takeLatest(LOGOUT_USER, doLogoutUser);
  yield takeLatest(REGISTER_USER, doRegisterUser);
  yield takeLatest(VERIFY_EMAIL_USER, doVerifyEmailUser);
  yield takeLatest(VALIDATE_EMAIL_USER, doValidateEmailUser);
}
