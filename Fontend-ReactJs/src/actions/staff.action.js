import * as type from '../constants/actionType';
import staffApi from '../apis/staff.api';
import { toast } from 'react-toastify';

const fetchStaffSuccess = (payload) => {
    return {
        type: type.FETCH_STAFF_SUCCESS,
        payload
    }
}

const fetchStaffFailed = (payload) => {
    return {
        type: type.FETCH_STAFF_FAILED,
        payload
    }
}

export const fetchStaffReq = () => {
    return (dispatch) => {
        staffApi.get()
            .then(data => dispatch(fetchStaffSuccess(data)))
            .catch(err => dispatch(fetchStaffFailed(err)));
    }
}

export const createStaffReq = (body) => {
    return (dispatch) => {
        staffApi.create(body)
            .then(data => {
                toast.success('Thêm TKNV thành công!');
                dispatch(fetchStaffReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Thêm TKNV thất bại!');
                }
            });
    }
}

export const updateStaffReq = (body) => {
    return (dispatch) => {
        staffApi.updateByAccountId(body)
            .then(data => {
                toast.success('Cập nhật TKNV thành công!');
                dispatch(fetchStaffReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Cập nhật TKNV thất bại!');
                }
            });
    }
}

export const deleteStaffReq = (body) => {
    return (dispatch) => {
        staffApi.deleteByAccountId(body)
            .then(data => {
                toast.success('Xóa TKNV thành công!');
                dispatch(fetchStaffReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Xóa TKNV thất bại!');
                }
            });
    }
}