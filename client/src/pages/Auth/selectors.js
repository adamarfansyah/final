import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAuthUserState = (state) => state.authUser || initialState;

export const selectAuthUser = createSelector(selectAuthUserState, (state) => state.data);
export const selectAuthUserLoading = createSelector(selectAuthUserState, (state) => state.isLoading);
