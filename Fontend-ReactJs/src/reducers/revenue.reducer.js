import * as type from "../constants/actionType";

const initialState = {
    rowCount: 0,
    rows: []
};

const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_REVENUE_SUCCESS: {
            return { ...action.payload }
        }
        case type.FETCH_REVENUE_FAILED: {
            return { ...state }
        }
        default: {
            return { ...state };
        }
    }
}

export default revenueReducer;