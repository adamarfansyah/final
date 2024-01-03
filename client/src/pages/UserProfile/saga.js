import { call, put, takeLatest } from 'redux-saga/effects';

import { getUserProfileApi, updateUserImageApi, updateUserPasswordApi, updateUserProfileApi } from '@domain/api';

import { setLoading, showPopup } from '@containers/App/actions';
import { GET_USER_PROFILE, UPDATE_USER_IMAGE, UPDATE_USER_PASSWORD, UPDATE_USER_PROFILE } from './constants';
import { getUserProfileSuccess, updateUserProfileSuccess } from './actions';

function* doGetUserProfile() {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserProfileApi);
    yield put(getUserProfileSuccess(response.data));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doUpdateUserProfile({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateUserProfileApi, data);
    yield put(updateUserProfileSuccess(response.data));
    yield put(showPopup('Success!', 'Success Update your profile!, please refresh page for best experience', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doUpdateUserPassword({ data }) {
  yield put(setLoading(true));
  try {
    yield call(updateUserPasswordApi, data);
    yield put(showPopup('Success!', 'Success Update your password!, please refresh page for best experience', true));
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doUpdateUserImage({ image, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(updateUserImageApi, image);
    yield put(
      showPopup('Success!', 'Success Update your Image Profile!, please refresh page for best experience', true)
    );
    cbSuccess && cbSuccess();
  } catch (error) {
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

export default function* userProfileSaga() {
  yield takeLatest(GET_USER_PROFILE, doGetUserProfile);
  yield takeLatest(UPDATE_USER_PROFILE, doUpdateUserProfile);
  yield takeLatest(UPDATE_USER_PASSWORD, doUpdateUserPassword);
  yield takeLatest(UPDATE_USER_IMAGE, doUpdateUserImage);
}
