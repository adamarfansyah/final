import { produce } from 'immer';

import { GET_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_SUCCESS } from './constants';

export const initialState = {
  userProfile: {},
  isLoading: false,
  error: '',
};

const userProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USER_PROFILE_SUCCESS:
        draft.isLoading = false;
        draft.userProfile = action.data;
        break;
      case UPDATE_USER_PROFILE_SUCCESS:
        draft.isLoading = false;
        draft.userProfile = action.data;
        break;
    }
  });

export default userProfileReducer;
