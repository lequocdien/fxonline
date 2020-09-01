import axiosClient from '../helpers/axiosClient';

const url = '/deposit';

const post = (body) => {
    return axiosClient.post(url, body);
}

export default {
    post
}