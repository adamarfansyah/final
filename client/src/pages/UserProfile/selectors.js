import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectUserProfileState = (state) => state.userProfile || initialState;

export const selectUserProfile = createSelector(selectUserProfileState, (state) => state.userProfile);
