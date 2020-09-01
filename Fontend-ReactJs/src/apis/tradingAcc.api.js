import axiosClient from '../helpers/axiosClient';

const URL_GET = 'trading-acc';
const URL_CREATE = 'trading-acc/create';

const get = ({ username }) => {
    return axiosClient.get(URL_GET, { params: { username } });
}

const create = ({ pass }) => {
    return axiosClient.post(URL_CREATE, { pass });
}

export default {
    get,
    create
}