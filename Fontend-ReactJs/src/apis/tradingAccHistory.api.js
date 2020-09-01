import axiosClient from '../helpers/axiosClient';

const url = '/trading-acc-history';

const get = (params) => {
    return axiosClient.get(url, {
        params: params
    });
}

export default {
    get
}