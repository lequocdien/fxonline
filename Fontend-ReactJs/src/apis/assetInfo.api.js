import axiosClient from '../helpers/axiosClient';

const url = '/asset';

const get = () => {
    return axiosClient.get(url);
}

export default {
    get
}