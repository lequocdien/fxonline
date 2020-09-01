import axios from 'axios';

const callApi = (method, url, params, body) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            params,
            data: body,
            headers: {
                'x-access-token': localStorage.getItem('accessToken') || ''
            }
        })
        .then(data => resolve(data.data))
        .catch(err => reject(err));
    })
}

export default callApi;