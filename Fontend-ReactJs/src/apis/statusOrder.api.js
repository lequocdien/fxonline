import axiosClient from '../helpers/axiosClient';

const URL_GET = '/status-order';

const get = () => {
    return axiosClient.get(URL_GET);
}

export default {
    get
}