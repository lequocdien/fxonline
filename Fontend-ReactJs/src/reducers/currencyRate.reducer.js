import * as type from "../constants/actionType";

const initialState = {
    isSuccess: false,
    rowCount: 0,
    rows: []
};

const currencyRateReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_CURRENCY_RATE_SUCCESS: {
            const { isSuccess, rowCount, rows } = action.payload;
            return {
                ...state,
                isSuccess: isSuccess,
                rowCount: rowCount,
                rows: rows
            };
        }
        case type.FETCH_CURRENCY_RATE_FAILED: {

        }
        default: {
            return { ...state };
        }
    }
}

export default currencyRateReducer;