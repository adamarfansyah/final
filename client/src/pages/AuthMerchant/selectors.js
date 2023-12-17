import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAuthMerchantState = (state) => state.authMerchant || initialState;

export const selectAuthMerchant = createSelector(selectAuthMerchantState, (state) => state.data);
