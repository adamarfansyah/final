import { call, put, takeLatest } from 'redux-saga/effects';

import { updateForgotPasswordMerchantApi, updateForgotPasswordUserApi } from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import { UPDATE_FORGOT_PASSWORD_MERCHANT, UPDATE_FORGOT_PASSWORD_USER } from './constants';

function* doUpdateForgotPasswordUser({ data, token, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateForgotPasswordUserApi, data, token);
    yield put(showPopup('Success Change Password!', 'Please login with your new password', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doUpdateForgotPasswordMerchant({ data, token, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateForgotPasswordMerchantApi, data, token);
    yield put(showPopup('Success Change Password!', 'Please login with your new password', true));
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* updatePasswordSaga() {
  yield takeLatest(UPDATE_FORGOT_PASSWORD_USER, doUpdateForgotPasswordUser);
  yield takeLatest(UPDATE_FORGOT_PASSWORD_MERCHANT, doUpdateForgotPasswordMerchant);
}
