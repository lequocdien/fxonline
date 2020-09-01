import * as type from '../constants/actionType';

const initialState = {
    rowCount: 0,
    rows: []
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_MENU_SUCCESS: {
            state = action.payload
            return { ...state };
        }
        case type.FETCH_MENU_FAILED: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default menuReducer;