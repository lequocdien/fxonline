import * as type from '../constants/actionType';

const initialState = {
    count: 0,
    rows: []
}

const offerHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_OFFER_HISTORY_SUCCESS: {
            return action.payload;
        }
        case type.FETCH_OFFER_HISTORY_FAILED: {
            return state;
        }
        default: {
            return {...state}
        }
    }
}

export default offerHistoryReducer;