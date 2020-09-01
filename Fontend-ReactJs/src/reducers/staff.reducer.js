import * as type from '../constants/actionType';
const initialState = {
    rowCount: 0,
    rows: []
};

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_STAFF_SUCCESS: {
            state = action.payload;
            return { ...state };
        }
        case type.FETCH_STAFF_FAILED: {
            return { ...state };
        }
        case type.RESET_STAFF: {
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

export default staffReducer;