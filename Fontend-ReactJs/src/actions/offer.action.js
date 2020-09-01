import * as type from '../constants/actionType';
import offerApi from '../apis/offer.api';
import { toast } from 'react-toastify';

const fetchOfferSuccess = (payload) => {
    return {
        type: type.FETCH_OFFER_EXCHANGE_SUCCESS,
        payload
    }
}

const fetchOfferFailed = (payload) => {
    return {
        type: type.FETCH_OFFER_EXCHANGE_FAILED,
        payload
    }
}

export const fetchOfferReq = () => {
    return (dispatch) => {
        offerApi.get()
            .then(data => dispatch(fetchOfferSuccess(data)))
            .catch(err => dispatch(fetchOfferFailed(err)));
    }
}

export const createOfferReq = (body) => {
    return (dispatch) => {
        offerApi.create(body)
            .then(data => toast.success('Đặt lệnh thành công!'))
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Đặt lệnh thất bại!');
                }
            });
    }
}

export const updateOfferReq = (body) => {
    return (dispatch) => {
        offerApi.update(body)
            .then(data => {
                toast.success('Cập nhật lệnh thành công!');
                dispatch(fetchOfferReq());
            })
            .catch(err => {
                if (err.status === 400) {
                    toast.error(err.data.error);
                }
                else {
                    toast.error('Cập nhật lệnh thất bại!');
                }
            });
    }
}