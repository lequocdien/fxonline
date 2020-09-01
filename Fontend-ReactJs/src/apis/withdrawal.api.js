import axiosClient from '../helpers/axiosClient';

const url = '/withdrawal';

const post = (body) => {
    return axiosClient.post(url, body);
}

export default {
    post
}