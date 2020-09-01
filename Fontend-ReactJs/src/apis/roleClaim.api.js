import axiosClient from '../helpers/axiosClient';

const URL_GET = 'role-claim';
const URL_POST = 'role-claim/update';

const get = ({ group }) => {
    return axiosClient.get(URL_GET, { params: { group } });
}

const post = (body) => {
    return axiosClient.post(URL_POST, [...body]);
}

export default {
    get,
    post
}