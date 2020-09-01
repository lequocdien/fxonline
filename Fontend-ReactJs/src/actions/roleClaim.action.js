import * as type from '../constants/actionType';
import roleClaim from '../apis/roleClaim.api';
import { toast } from 'react-toastify';

const fetchRoleClaimSuccess = (payload) => {
    return {
        type: type.FETCH_ROLE_CLAIM_SUCCESS,
        payload
    }
}

const fetchRoleClaimFailed = (payload) => {
    return {
        type: type.FETCH_ROLE_CLAIM_FAILED,
        payload
    }
}

const updateRoleClaimSuccess = (payload) => {
    return {
        type: type.UPDATE_ROLE_CLAIM_SUCCESS,
        payload
    }
}

const updateRoleClaimFailed = (payload) => {
    return {
        type: type.UPDATE_ROLE_CLAIM_FAILED,
        payload
    }
}

export const fetchRoleClaimReq = ({ group }) => {
    return (dispatch) => {
        roleClaim.get({ group })
            .then(data => dispatch(fetchRoleClaimSuccess(data)))
            .catch(err => dispatch(fetchRoleClaimFailed(err)));
    }
}

export const updateRoleClaimReq = (body) => {
    return (dispatch) => {
        roleClaim.post(body)
            .then(data => {
                toast.success('Cấp quyền thành công!');
            })
            .catch(err => toast.error('Cấp quyền thất bại!'));
    }
}