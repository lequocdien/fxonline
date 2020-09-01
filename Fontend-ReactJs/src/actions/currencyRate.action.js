import * as type from '../constants/actionType';
import currencyRateApi from '../apis/currencyRate.api';

const fetchCurrencyRateSuccess = (payload) => {
    return {
        type: type.FETCH_CURRENCY_RATE_SUCCESS,
        payload
    }
}

const fetchCurrencyRateFailed = (payload) => {
    return {
        type: type.FETCH_CURRENCY_RATE_FAILED,
        payload
    }
}

export const fetchCurrencyRateReq = () => {
    return (dispatch) => {
        currencyRateApi.get()
            .then(data => dispatch(fetchCurrencyRateSuccess(data)))
            .catch(err => dispatch(fetchCurrencyRateFailed(err)));
    }
}