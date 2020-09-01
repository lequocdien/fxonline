import * as type from '../constants/actionType';
import traderApi from '../apis/trader.api';
import { toast } from 'react-toastify';

const fetchTraderSuccess = (payload) => {
    return {
        type: type.FETCH_TRADER_SUCCESS,
        payload
    }
}

const fetchTraderFailed = (payload) => {
    return {
        type: type.FETCH_TRADER_FAILED,
        payload
    }
}

const fetchTraderByTradingSuccess = (payload) => {
    return {
        type: type.FETCH_TRADER_BY_TRADING_ACC_SUCCESS,
        payload
    }
}

const fetchTraderByTradingAccFailed = (payload) => {
    return {
        type: type.FETCH_TRADER_BY_TRADING_ACC_FAILED,
        payload
    }
}

export const fetchTraderReq = () => {
    return (dispatch) => {
        traderApi.get()
            .then(data => dispatch(fetchTraderSuccess(data)))
            .catch(err => dispatch(fetchTraderFailed(err)));
    }
}

export const fetchTraderByTradingAccReq = ({ tradingAcc }) => {
    return (dispatch) => {
        traderApi.getByTradingAcc({ tradingAcc })
            .then(data => dispatch(fetchTraderByTradingSuccess(data)))
            .catch(err => dispatch(fetchTraderByTradingAccFailed(err)));
    }
}

export const createTraderReq = (body) => {
    return (dispatch) => {
        traderApi.create(body)
            .then(data => {
                toast.success('Thêm TKNDT thành công!')
                dispatch(fetchTraderReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Thêm TKNDT thất bại!');
                }
            });
    }
}

export const updateTraderReq = (body) => {
    return (dispatch) => {
        traderApi.update(body)
            .then(data => {
                toast.success('Cập nhật TKNDT thành công!')
                dispatch(fetchTraderReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Cập nhật TKNDT thất bại!');
                }
            });
    }
}

export const deleteTraderReq = (body) => {
    return (dispatch) => {
        traderApi.deleteByAccountId(body)
            .then(data => {
                toast.success('Xóa TKNDT thành công!')
                dispatch(fetchTraderReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Xóa TKNDT thất bại!');
                }
            });
    }
}

export const resetTrader = () => {
    return {
        type: type.RESET_TRADER
    }
}