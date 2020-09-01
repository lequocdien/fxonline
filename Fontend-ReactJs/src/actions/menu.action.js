import * as type from '../constants/actionType';
import menuApi from '../apis/menu.api';

const fetchListMenuSuccess = (payload) => {
    return {
        type: type.FETCH_MENU_SUCCESS,
        payload
    }
}

const fetchListMenuFailed = (payload) => {
    return {
        type: type.FETCH_MENU_FAILED,
        payload
    }
}

export const fetchListMenuReq = () => {
    return (dispatch) => {
        menuApi.get()
            .then(data => dispatch(fetchListMenuSuccess(data)))
            .catch(err => dispatch(fetchListMenuFailed(err)))
    }
}