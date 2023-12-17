import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectLoginFailure = createSelector(selectClientState, (state) => state.error);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectTokenMerchant = createSelector(selectClientState, (state) => state.tokenMerchant);
