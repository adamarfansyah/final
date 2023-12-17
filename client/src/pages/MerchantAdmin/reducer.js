import { produce } from 'immer';

import { GET_MERCHANT_PROFILE_SUCCESS, GET_MERCHANT_VENUES_SUCCESS } from './constants';

export const initialState = {
  merchant: {},
  merchantVenues: [],
  isLoading: false,
  error: '',
};

export const storedKey = ['merchant'];

const merchantReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MERCHANT_PROFILE_SUCCESS:
        draft.isLoading = false;
        draft.merchant = action.data;
        break;
      case GET_MERCHANT_VENUES_SUCCESS:
        draft.isLoading = false;
        draft.merchantVenues = action.venues;
        break;
    }
  });

export default merchantReducer;
