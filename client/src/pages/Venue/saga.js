import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createPaymentApi,
  createTokenPaymentApi,
  getCategoriesApi,
  getMerchantsApi,
  getOperationalVenueApi,
  sendEmailAfterPaymentApi,
} from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import {
  CREATE_PAYMENT,
  CREATE_TOKEN_PAYMENT,
  GET_CATEGORIES,
  GET_MERCHANTS,
  GET_VENUE_SCHEDULE,
  SEND_EMAIL_PAYMENT,
} from './constants';
import { getVenueScheduleSuccess, setCategories, setMerchants } from './actions';

function* doGetMerchants() {
  yield put(setLoading(true));

  try {
    const response = yield call(getMerchantsApi);
    yield put(setMerchants(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetCategories() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCategoriesApi);
    yield put(setCategories(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doGetVenueSchedule({ id }) {
  yield put(setLoading(true));

  try {
    const response = yield call(getOperationalVenueApi, id);
    yield put(getVenueScheduleSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doCreateTokenPayment({ data, merchantId, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createTokenPaymentApi, data);
    window.snap.pay(response?.data?.token, {
      onSuccess: (result) => {
        cbSuccess &&
          cbSuccess({
            merchantId,
            venueId: data.venueId,
            grossAmount: result.gross_amount,
            orderId: result.order_id,
            paymentType: result.payment_type,
            transactionId: result.transaction_id,
            transactionTime: result.transaction_time,
            startTime: data.startTime,
            endTime: data.endTime,
          });
      },
    });
  } catch (error) {
    yield put(showPopup('Sorry :(', 'Please Login or Register for book venue'));
  }
  yield put(setLoading(false));
}

function* doCreatePayment({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createPaymentApi, data);
    cbSuccess && cbSuccess(response.data.orderId);
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doSendEmailPayment({ data }) {
  yield put(setLoading(true));
  try {
    yield call(sendEmailAfterPaymentApi, data);
    yield put(showPopup('Thank you for order!', 'Please Check your email for receipt', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* venueSaga() {
  yield takeLatest(GET_MERCHANTS, doGetMerchants);
  yield takeLatest(GET_CATEGORIES, doGetCategories);
  yield takeLatest(GET_VENUE_SCHEDULE, doGetVenueSchedule);
  yield takeLatest(CREATE_TOKEN_PAYMENT, doCreateTokenPayment);
  yield takeLatest(CREATE_PAYMENT, doCreatePayment);
  yield takeLatest(SEND_EMAIL_PAYMENT, doSendEmailPayment);
}
