import * as type from "../constants/actionType";

const initialState = {
    rowCount: 0,
    rows: []
};

const assetInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_ASSET_SUCCESS: {
            return { ...action.payload }
        }
        case type.FETCH_ASSET_FAILED: {
            return { ...state }
        }
        default: {
            return { ...state };
        }
    }
}

export default assetInfoReducer;