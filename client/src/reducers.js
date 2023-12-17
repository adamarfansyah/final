import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import authUserReducer, { storedKey as storedAuthUserState } from '@pages/Auth/reducer';
import authMerchantReducer, { storedKey as storedAuthMerchantState } from '@pages/AuthMerchant/reducer';
import merchantReducer, { storedKey as storedMerchantState } from '@pages/MerchantAdmin/reducer';
import venueReducer from '@pages/Venue/reducer';
import languageReducer from '@containers/Language/reducer';
import merchantDetailReducer from '@pages/MerchantDetail/reducer';
import userProfileReducer from '@pages/UserProfile/reducer';
import transactionReducer from '@pages/TransactionDetail/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  authUser: { reducer: authUserReducer, whitelist: storedAuthUserState },
  authMerchant: { reducer: authMerchantReducer, whitelist: storedAuthMerchantState },
  merchant: { reducer: merchantReducer, whitelist: storedMerchantState },
};

const temporaryReducers = {
  language: languageReducer,
  merchants: venueReducer,
  merchantDetail: merchantDetailReducer,
  transactions: transactionReducer,
  userProfile: userProfileReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
