import { produce } from 'immer';

import { GET_MERCHANT_DETAIL, GET_MERCHANT_DETAIL_SUCCESS } from './constants';

export const initialState = {
  merchantDetail: {},
  isLoading: false,
  error: '',
};

const merchantDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MERCHANT_DETAIL:
        draft.isLoading = true;
        break;
      case GET_MERCHANT_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.merchantDetail = action.data;
        break;
    }
  });

export default merchantDetailReducer;
