import * as type from '../constants/actionType';
import offerHistoryApi from '../apis/offerHistory.api';

const offerHistroySuccess = (payload) => {
    return {
        type: type.FETCH_OFFER_HISTORY_SUCCESS,
        payload
    }
}

const offerHistroyFailed = (payload) => {
    return {
        type: type.FETCH_OFFER_HISTORY_FAILED,
        payload
    }
}

export const fetchOfferHistroyReq = (param) => {
    return (dispatch) => {
        offerHistoryApi.get(param)
            .then(data => dispatch(offerHistroySuccess(data)))
            .catch(err => dispatch(offerHistroyFailed(err)));
    }
}