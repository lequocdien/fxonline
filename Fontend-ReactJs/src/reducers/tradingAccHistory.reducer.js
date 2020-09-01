import * as type from '../constants/actionType';

const initialState = {
    count: 0,
    rows: []
}

const tradingAccHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_TRADING_ACC_HISTORY_SUCCESS: {
            return action.payload;
        }
        case type.FETCH_TRADING_ACC_HISTORY_FAILED: {
            return state;
        }
        default: {
            return { ...state }
        }
    }
}

export default tradingAccHistoryReducer;