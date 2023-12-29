import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectMerchantState = (state) => state.merchant || initialState;

export const selectMerchantProfile = createSelector(selectMerchantState, (state) => state.merchant);
export const selectMerchantVenues = createSelector(selectMerchantState, (state) => state.merchantVenues);
export const selectMerchantVenueOps = createSelector(selectMerchantState, (state) => state.venueOperational);
