import * as type from '../constants/actionType';
import { fetchUserGroupReq } from '../actions/userGroup.action';
import { toast } from 'react-toastify';

const initialState = {
    "rowCount": 0,
    "rows": []
}

const userGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_USER_GROUP_SUCCESS: {
            state = action.payload;
            return { ...state };
        }
        case type.FETCH_USER_GROUP_FAILED: {
            return { ...state };
        }
        case type.UPDATE_USER_GROUP_SUCCESS: {
            toast.success('Cập nhật thành công!');
            return { ...state };
        }
        case type.UPDATE_USER_GROUP_FAILED: {
            toast.error('Cập nhật thất bại!');
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default userGroupReducer;