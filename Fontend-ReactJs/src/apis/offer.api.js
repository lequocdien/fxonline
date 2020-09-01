import axiosClient from '../helpers/axiosClient';

const URL_GET = '/offer';
const URL_CREATE = '/offer/create';
const URL_UPDATE = '/offer/update';

const get = () => {
    return axiosClient.get(URL_GET);
}

const create = (body) => {
    return axiosClient.post(URL_CREATE, body);
}

const update = (body) => {
    return axiosClient.post(URL_UPDATE, body);
}

export default {
    get,
    create,
    update
}