import axiosClient from '../helpers/axiosClient';

const URL_LIST = '/staff';
const URL_CREATE = '/staff/create';
const URL_UPDATE = '/staff/update';
const URL_DELETE = '/staff/delete';

const get = () => {
    return axiosClient.get(URL_LIST);
}

const create = (body) => {
    return axiosClient.post(URL_CREATE, body);
}

const updateByAccountId = (body) => {
    return axiosClient.post(URL_UPDATE, body);
}

const deleteByAccountId = (body) => {
    return axiosClient.post(URL_DELETE, body);
}

export default {
    get,
    create,
    updateByAccountId,
    deleteByAccountId
}