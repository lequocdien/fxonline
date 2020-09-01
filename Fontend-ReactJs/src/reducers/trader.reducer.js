import * as type from '../constants/actionType';
const initialState = {
    rowCount: 0,
    rows: [
        {
            first_name: "",
            full_name: "",
            gender: true,
            last_name: "",
            phone: "",
            trader_id: 10,
        }

    ]
};

const traderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_TRADER_BY_TRADING_ACC_SUCCESS: {
            return action.payload;
        }
        case type.FETCH_TRADER_BY_TRADING_ACC_FAILED: {
            return initialState;
        }
        case type.FETCH_TRADER_SUCCESS: {
            state = action.payload;
            return { ...state };
        }
        case type.FETCH_TRADER_FAILED: {
            return { ...state };
        }
        case type.RESET_TRADER: {
            state = {
                rowCount: 0,
                rows: [
                    {
                        first_name: "",
                        gender: true,
                        last_name: "",
                        phone: "",
                        trader_id: 0,
                    }
                ]
            }
            return { ...state }
        }
        default: {
            return { ...state }
        }
    }
}

export default traderReducer;