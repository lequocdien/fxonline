import * as type from '../constants/actionType';

const intitialState = {};

const tradingAccountReducer = (state = intitialState, action) => {
    switch (action.type) {
        case type.FETCH_TRADING_ACC_SUCCESS: {
            state = action.payload;
            const { payload } = action;
            return { ...payload };
        }
        case type.FETCH_TRADING_ACC_FAILED: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default tradingAccountReducer;