import axiosClient from '../helpers/axiosClient';

const URL_GET = '/user-group';
const URL_CREATE = '/user-group/create';
const URL_UPDATE = '/user-group/update';
const URL_DELETE = '/user-group/delete';

const get = () => {
    return axiosClient.get(URL_GET);
}

const create = ({ groupName, isActive, description }) => {
    return axiosClient.post(URL_CREATE, { groupName, isActive, description });
}

const updateByGroupId = ({ groupName, isActive, description, groupId }) => {
    return axiosClient.post(URL_UPDATE, { groupName, isActive, description, groupId });
}

const deleteByGroupId = ({ groupId }) => {
    return axiosClient.post(URL_DELETE, { groupId });
}

export default {
    get,
    create,
    updateByGroupId,
    deleteByGroupId
}