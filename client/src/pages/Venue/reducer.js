import { produce } from 'immer';

import { GET_VENUE_DETAIL_SUCCESS, GET_VENUE_SCHEDULE_SUCCESS, SET_CATEGORIES, SET_MERCHANTS } from './constants';

export const initialState = {
  merchants: [],
  categories: [],
  venueDetail: {},
  venueSchedule: {},
};

const venueReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MERCHANTS:
        draft.merchants = action.data;
        break;
      case SET_CATEGORIES:
        draft.categories = action.data;
        break;
      case GET_VENUE_DETAIL_SUCCESS:
        draft.venueDetail = action.data;
        break;
      case GET_VENUE_SCHEDULE_SUCCESS:
        draft.venueSchedule = action.data;
        break;
    }
  });

export default venueReducer;
