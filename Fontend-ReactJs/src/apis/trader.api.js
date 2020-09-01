import axiosClient from '../helpers/axiosClient';

const URL_GET_BY_TRADING_ACC = '/trader/get-by-trading-acc';
const URL_LIST = '/trader';
const URL_CREATE = '/trader/create';
const URL_UPDATE = '/trader/update';
const URL_DELETE = '/trader/delete';

const getByTradingAcc = ({ tradingAcc }) => {
    return axiosClient.get(URL_GET_BY_TRADING_ACC, {
        params: { tradingAcc }
    });
}

const get = () => {
    return axiosClient.get(URL_LIST);
}

const create = (body) => {
    return axiosClient.post(URL_CREATE, body);
}

const update = (body) => {
    return axiosClient.post(URL_UPDATE, body);
}

const deleteByAccountId = (body) => {
    return axiosClient.post(URL_DELETE, body);
}

export default {
    getByTradingAcc,
    get,
    create,
    update,
    deleteByAccountId
}