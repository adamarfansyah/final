import { produce } from 'immer';

import {
  DELETE_VENUE_OPERATIONAL,
  GET_MERCHANT_PROFILE_SUCCESS,
  GET_MERCHANT_VENUES_SUCCESS,
  GET_MERCHANT_VENUE_OPERATIONAL_SUCCESS,
} from './constants';

export const initialState = {
  merchant: {},
  merchantVenues: [],
  venueOperational: {},
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
      case GET_MERCHANT_VENUE_OPERATIONAL_SUCCESS:
        draft.isLoading = false;
        draft.venueOperational = action.data;
        break;
      case DELETE_VENUE_OPERATIONAL:
        draft.venueOperational = {};
        break;
    }
  });

export default merchantReducer;
