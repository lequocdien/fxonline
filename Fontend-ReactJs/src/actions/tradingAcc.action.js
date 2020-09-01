import * as type from '../constants/actionType';
import tradingAccApi from '../apis/tradingAcc.api';
import { toast } from 'react-toastify';
import getPayloadToken from '../helpers/utilities/getPayloadToken';

const fetchTradingAccSuccess = (payload) => {
    return {
        type: type.FETCH_TRADING_ACC_SUCCESS,
        payload
    }
}

const fetchTradingAccFailed = (payload) => {
    return {
        type: type.FETCH_TRADING_ACC_FAILED,
        payload
    }
}

export const fetchTradingAccReq = ({ username }) => {
    return (dispatch) => {
        tradingAccApi.get({ username })
            .then(data => dispatch(fetchTradingAccSuccess(data)))
            .catch(err => dispatch(fetchTradingAccFailed(err)));
    }
}

export const createTradingAccReq = ({ pass }) => {
    return (dispatch) => {
        tradingAccApi.create({ pass })
            .then(data => {
                const { usr } = getPayloadToken();
                dispatch(fetchTradingAccReq({ username: usr }));
                toast.success('Đăng ký TKGD thành công!');
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Đăng ký TKGD thất bại!');
                }
            });
    }
}