import axiosClient from '../helpers/axiosClient';

const url = '/login';

const post = ({ username, password }) => {
    return axiosClient.post(url, { username, password });
}

export default {
    post
}