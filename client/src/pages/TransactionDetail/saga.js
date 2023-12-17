import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import {
  getPaymentDetailByMerchantApi,
  getPaymentDetailByUserApi,
  getPaymentsByMerchantApi,
  getPaymentsByUserApi,
} from '@domain/api';
import {
  GET_PAYMENT_USER,
  GET_PAYMENT_DETAIL_USER,
  GET_PAYMENTS_MERCHANT,
  GET_PAYMENT_DETAIL_MERCHANT,
} from './constants';
import {
  getPaymentByUserSuccess,
  getPaymentDetailByUserSuccess,
  getPaymentsByMerchantSuccess,
  getPaymentDetailByMerchantSuccess,
} from './actions';

function* doGetPaymentsUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(getPaymentsByUserApi);
    yield put(getPaymentByUserSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetPaymentDetailUser({ transactionId }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getPaymentDetailByUserApi, transactionId);
    yield put(getPaymentDetailByUserSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetPaymentsMerchant() {
  yield put(setLoading(true));
  try {
    const response = yield call(getPaymentsByMerchantApi);
    yield put(getPaymentsByMerchantSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetPaymentDetailMerchant({ transactionId }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getPaymentDetailByMerchantApi, transactionId);
    yield put(getPaymentDetailByMerchantSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* transactionSaga() {
  yield takeLatest(GET_PAYMENT_USER, doGetPaymentsUser);
  yield takeLatest(GET_PAYMENT_DETAIL_USER, doGetPaymentDetailUser);
  yield takeLatest(GET_PAYMENTS_MERCHANT, doGetPaymentsMerchant);
  yield takeLatest(GET_PAYMENT_DETAIL_MERCHANT, doGetPaymentDetailMerchant);
}
