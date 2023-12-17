import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectMerchantDetailState = (state) => state.merchantDetail || initialState;

export const selectMerchantDetail = createSelector(selectMerchantDetailState, (state) => state.merchantDetail);
