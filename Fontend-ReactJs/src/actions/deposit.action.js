import * as type from '../constants/actionType';
import depositApi from '../apis/deposit.api';
import { toast } from 'react-toastify';

const depositSuccess = (payload) => {
    return {
        type: type.DEPOSIT_SUCCESS,
        payload
    }
}

const depositFailed = (payload) => {
    return {
        type: type.DEPOSIT_FAILED,
        payload
    }
}

export const depositReq = (body) => {
    return (dispatch) => {
        depositApi.post(body)
            .then(data => toast.success('Nạp tiền thành công!'))
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Nạp tiền thất bại!');
                }
            });
    }
}