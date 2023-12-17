import { call, takeLatest } from 'redux-saga/effects';

import { updateForgotPasswordUserApi } from '@domain/api';

import { setLoading } from '@containers/App/actions';
import { UPDATE_FORGOT_PASSWORD_USER } from './constants';

function* doUpdateForgotPasswordUser({ data, token, cbSuccess }) {
  yield setLoading(true);
  try {
    yield call(updateForgotPasswordUserApi, data, token);
    cbSuccess && cbSuccess();
  } catch (error) {
    console.log({ error });
  }
  yield setLoading(false);
}

export default function* updatePasswordSaga() {
  yield takeLatest(UPDATE_FORGOT_PASSWORD_USER, doUpdateForgotPasswordUser);
}
