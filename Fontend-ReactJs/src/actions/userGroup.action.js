import * as type from '../constants/actionType';
import userGroup from '../apis/userGroup.api';
import { toast } from 'react-toastify';

const fetchUserGroupSuccess = (payload) => {
    return {
        type: type.FETCH_USER_GROUP_SUCCESS,
        payload
    }
}

const fetchUserGroupFailed = (payload) => {
    return {
        type: type.FETCH_USER_GROUP_FAILED,
        payload
    }
}

export const fetchUserGroupReq = () => {
    return (dispatch) => {
        userGroup.get()
            .then(data => dispatch(fetchUserGroupSuccess(data)))
            .catch(err => dispatch(fetchUserGroupFailed(err)));
    }
}

export const insertUserGroupReq = ({ groupName, isActive, description }) => {
    return (dispatch) => {
        userGroup.create({ groupName, isActive, description })
            .then(data => {
                toast.success('Thêm nhóm quyền thành công!');
                dispatch(fetchUserGroupReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Thêm nhóm quyền thất bại!');
                }
            });
    }
}

export const updateUserGroupReq = ({ groupName, isActive, description, groupId }) => {
    return (dispatch) => {
        userGroup.updateByGroupId({ groupName, isActive, description, groupId })
            .then(data => {
                toast.success('Cập nhật nhóm quyền thành công!');
                dispatch(fetchUserGroupReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Cập nhật nhóm quyền thất bại!');
                }
            });
    }
}

export const deleteUserGroupReq = ({ groupId }) => {
    return (dispatch) => {
        userGroup.deleteByGroupId({ groupId })
            .then(data => {
                toast.success('Xóa nhóm quyền thành công!');
                dispatch(fetchUserGroupReq());
            })
            .catch(err => toast.error('Xóa nhóm quyền thất bại!'));
    }
}