import * as type from '../constants/actionType';
import assetInfoApi from '../apis/assetInfo.api';

const fetchAssetSuccess = (payload) => {
    return {
        type: type.FETCH_ASSET_SUCCESS,
        payload
    }
}

const fetchAssetFailed = (payload) => {
    return {
        type: type.FETCH_ASSET_FAILED,
        payload
    }
}

export const fetchAssetReq = () => {
    return (dispatch) => {
        assetInfoApi.get()
            .then(data => dispatch(fetchAssetSuccess(data)))
            .catch(err => dispatch(fetchAssetFailed(err)));
    }
}