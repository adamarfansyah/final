import { call, put, takeLatest } from 'redux-saga/effects';

import { getMerchantDetailApi } from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import { GET_MERCHANT_DETAIL } from './constants';
import { getMerchantDetailSuccess } from './actions';

function* doGetMerchantDetail({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getMerchantDetailApi, id);
    yield put(getMerchantDetailSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* merchantDetailSaga() {
  yield takeLatest(GET_MERCHANT_DETAIL, doGetMerchantDetail);
}
