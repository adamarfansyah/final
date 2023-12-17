import { call, put, takeLatest } from 'redux-saga/effects';

import { forgotPasswordUserApi } from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import { FORGOT_PASSWORD_USER } from './constants';

function* doForgotPassword({ email }) {
  yield setLoading(true);
  try {
    yield call(forgotPasswordUserApi, email);
    yield put(showPopup('Thank you!', 'Your verification is success! Please check your email', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield setLoading(false);
}

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_USER, doForgotPassword);
}
