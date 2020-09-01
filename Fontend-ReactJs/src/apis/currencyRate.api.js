import axiosClient from '../helpers/axiosClient';

const url = '/currency-rate';

const get = () => {
    return axiosClient.get(url);
}

export default {
    get
}