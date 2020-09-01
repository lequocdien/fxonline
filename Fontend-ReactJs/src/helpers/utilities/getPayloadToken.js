import _ from 'lodash';

const getPayloadToken = () => {
    const token = localStorage.getItem('accessToken') || '';
    var res = {
        usr: '',
        typ: '',
        grp: ''
    }
    const arr = _.split(token, '.');
    if (_.size(arr) === 3) {
        res = JSON.parse(atob(arr[1]));
    }
    return res;
}

export default getPayloadToken;