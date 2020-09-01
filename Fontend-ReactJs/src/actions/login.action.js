import * as type from '../constants/actionType';
import loginApi from '../apis/login.api';

const fetchTokenSuccess = (payload) => {
    return {
        type: type.FETCH_TOKEN_SUCESS,
        payload
    }
}

const fetchTokenFailed = (payload) => {
    return {
        type: type.FETCH_TOKEN_FAILED,
        payload
    }
}

export const getToken = () => {
    return {
        type: type.GET_TOKEN
    }
}

export const fetchTokenReq = ({ username, password }) => {
    return (dispatch) => {
        loginApi.post({ username, password })
            .then(data => dispatch(fetchTokenSuccess(data)))
            .catch(err => dispatch(fetchTokenFailed(err)));
    }
}