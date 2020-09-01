import * as type from '../constants/actionType';
import withdrawalApi from '../apis/withdrawal.api';
import { toast } from 'react-toastify';

const withdrawalSuccess = (payload) => {
    return {
        type: type.WITHDRAWAL_SUCCESS,
        payload
    }
}

const withdrawalFailed = (payload) => {
    return {
        type: type.WITHDRAWAL_FAILED,
        payload
    }
}

export const withdrawalReq = (body) => {
    return (dispatch) => {
        withdrawalApi.post(body)
            .then(data => toast.success('Rút tiền thành công!'))
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Rút tiền thất bại!');
                }
            });
    }
}