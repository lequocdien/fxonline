import { toast } from 'react-toastify';
import * as type from '../constants/actionType';

const initialState = {
    "rowCount": 0,
    "rows": []
}

const roleClaimReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_ROLE_CLAIM_SUCCESS: {
            state = action.payload;
            return { ...state };
        }
        case type.FETCH_ROLE_CLAIM_FAILED: {
            return { ...state };
        }
        case type.UPDATE_ROLE_CLAIM_SUCCESS: {
            toast.success("update is success!");
            return { ...state };
        }
        case type.UPDATE_ROLE_CLAIM_FAILED: {
            toast.error("update is failed!");
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default roleClaimReducer;