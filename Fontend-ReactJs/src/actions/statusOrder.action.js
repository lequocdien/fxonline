import * as type from '../constants/actionType';
import statusOrder from '../apis/statusOrder.api';

const fetchStatusSuccess = (payload) => {
    return {
        type: type.FETCH_STATUS_ORDER_SUCCESS,
        payload
    }
}

const fetchStatusFailed = (payload) => {
    return {
        type: type.FETCH_STATUS_ORDER_FAILED,
        payload
    }
}

export const fetchStatusOrderReq = () => {
    return dispatch => {
        statusOrder.get()
            .then(data => dispatch(fetchStatusSuccess(data)))
            .catch(err => dispatch(fetchStatusFailed(err)))
    }
}