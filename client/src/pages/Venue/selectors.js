import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectMerchantState = (state) => state.merchants || initialState;

export const selectMerchants = createSelector(selectMerchantState, (state) => state.merchants);
export const selectCategories = createSelector(selectMerchantState, (state) => state.categories);
export const selectVenueSchedule = createSelector(selectMerchantState, (state) => state.venueSchedule);
