import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAssetReq } from '../actions/assetInfo.action';
import AssetInfo from '../layouts/AssetInfo/AssetInfo';
import formatAsset from '../helpers/utilities/formatAsset';

const AssetInfoContainer = (props) => {

    useEffect(() => {
        props.fetchAssetReq();
    }, [])

    return (
        <AssetInfo
            assets={formatAsset(props.asset.rows)}
        />
    );
};

const mapStateToProps = state => {
    return {
        asset: state.asset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAssetReq: () => {
            dispatch(fetchAssetReq());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetInfoContainer);