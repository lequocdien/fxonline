import * as type from '../constants/actionType';

const initialState = {
    rowCount: 0,
    rows: []
}

const statusOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_STATUS_ORDER_SUCCESS: {
            state = action.payload;
            return { ...state };
        }
        case type.FETCH_STATUS_ORDER_FAILED: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default statusOrderReducer;