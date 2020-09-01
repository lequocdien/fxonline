import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:2000/api/'
    // baseURL: 'https://fxonline.herokuapp.com/api/'
})

axiosClient.interceptors.request.use(config => {
    config.headers['x-access-token'] = localStorage.getItem('accessToken') || '';
    return config;
});

axiosClient.interceptors.response.use((response) => {
    // console.log(response.data);
    return response.data;
}, err => {
    console.log(err.response.data);
    return Promise.reject(err.response);
});

export default axiosClient;