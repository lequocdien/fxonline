import * as type from '../constants/actionType';
import revenueApi from '../apis/revenue.api';

const fetchRevenueSuccess = (payload) => {
    return {
        type: type.FETCH_REVENUE_SUCCESS,
        payload
    }
}

const fetchRevenueFailed = (payload) => {
    return {
        type: type.FETCH_REVENUE_FAILED,
        payload
    }
}

export const fetchRevenueReq = () => {
    return (dispatch) => {
        revenueApi.get()
            .then(data => dispatch(fetchRevenueSuccess(data)))
            .catch(err => dispatch(fetchRevenueFailed(err)));
    }
}