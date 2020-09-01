import axiosClient from '../helpers/axiosClient';

const url = '/revenue';

const get = () => {
    return axiosClient.get(url);
}

export default {
    get
}