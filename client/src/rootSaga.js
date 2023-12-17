import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import authUserSaga from '@pages/Auth/saga';
import venueSaga from '@pages/Venue/saga';
import authMerchantSaga from '@pages/AuthMerchant/saga';
import merchantSaga from '@pages/MerchantAdmin/saga';
import merchantDetailSaga from '@pages/MerchantDetail/saga';
import userProfileSaga from '@pages/UserProfile/saga';
import transactionSaga from '@pages/TransactionDetail/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import updatePasswordSaga from '@pages/UpdatePasswordUser/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    authUserSaga(),
    authMerchantSaga(),
    venueSaga(),
    merchantSaga(),
    merchantDetailSaga(),
    userProfileSaga(),
    transactionSaga(),
    forgotPasswordSaga(),
    updatePasswordSaga(),
  ]);
}
