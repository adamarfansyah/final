import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectTransactionsState = (state) => state.transactions || initialState;

export const selectPaymentByUser = createSelector(selectTransactionsState, (state) => state.paymentsUser);
export const selectPaymentDetailByUser = createSelector(selectTransactionsState, (state) => state.paymentDetailUser);

export const selectPaymentsByMerchant = createSelector(selectTransactionsState, (state) => state.paymentsMerchant);
export const selectPaymentDetailByMerchant = createSelector(
  selectTransactionsState,
  (state) => state.paymentDetailMerchant
);
