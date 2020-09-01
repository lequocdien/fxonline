import axiosClient from '../helpers/axiosClient';

const url = '/menu';

const get = () => {
    return axiosClient.get(url);
}

export default {
    get
};