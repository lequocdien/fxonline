import * as type from '../constants/actionType';
import tradingAccHistoryApi from '../apis/tradingAccHistory.api';

const tradingAccHistorySuccess = (payload) => {
    return {
        type: type.FETCH_TRADING_ACC_HISTORY_SUCCESS,
        payload
    }
}

const tradingAccHistoryFailed = (payload) => {
    return {
        type: type.FETCH_TRADING_ACC_HISTORY_FAILED,
        payload
    }
}

export const fetchTradingAccHistoryReq = (param) => {
    return (dispatch) => {
        tradingAccHistoryApi.get(param)
            .then(data => dispatch(tradingAccHistorySuccess(data)))
            .catch(err => dispatch(tradingAccHistoryFailed(err)));
    }
}