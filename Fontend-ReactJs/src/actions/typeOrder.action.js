import * as type from '../constants/actionType';
import typeOrder from '../apis/typeOrder.api';

const fetchTypeOrderSuccess = (payload) => {
    return {
        type: type.FETCH_TYPE_ORDER_SUCCESS,
        payload
    }
}

const fetchTypeOrderFailed = (payload) => {
    return {
        type: type.FETCH_TYPE_ORDER_FAILED,
        payload
    }
}

export const fetchTypeOrderReq = () => {
    return dispatch => {
        typeOrder.get()
            .then(data => dispatch(fetchTypeOrderSuccess(data)))
            .catch(err => dispatch(fetchTypeOrderFailed(err)))
    }
}