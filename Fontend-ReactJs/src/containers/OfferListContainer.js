import React, { useEffect } from 'react';
import OfferList from '../layouts/OfferList/OfferList';
import { connect } from 'react-redux';
import { fetchOfferReq, updateOfferReq } from '../actions/offer.action';
import formatDataSourceOffer from '../helpers/utilities/formatDataSourceOffer';
import { fetchTradingAccReq } from '../actions/tradingAcc.action';
import { fetchCurrencyRateReq } from '../actions/currencyRate.action';
import { getToken } from '../actions/login.action';
import getPayloadToken from '../helpers/utilities/getPayloadToken';
import formatListOffer from '../helpers/utilities/formatListOffer';
import { fetchTypeOrderReq } from '../actions/typeOrder.action';
import { fetchStatusOrderReq } from '../actions/statusOrder.action';

const OfferListContainer = (props) => {
    useEffect(() => {
        props.fetchListOfferReq();
        props.fetchTypeOrderReq();
        props.fetchStatusOrderReq();
        props.fetchCurrencyRateReq();
    }, [])

    return (
        <OfferList
            offer={formatListOffer(props.offers.rows)}
            tradingAcc={props.tradingAcc.rows}
            currencyRate={props.currencyRate.rows}
            typeOrder={props.typeOrder.rows}
            statusOrder={props.statusOrder.rows}
            fetchTradingAccReq={props.fetchTradingAccReq}
            updateOfferReq={props.updateOfferReq} />
    );
};

const mapStateToProps = state => {
    return {
        login: state.login,
        offers: state.offer,
        tradingAcc: state.tradingAcc,
        currencyRate: state.currencyRate,
        typeOrder: state.typeOrder,
        statusOrder: state.statusOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListOfferReq: () => {
            dispatch(fetchOfferReq());
        },
        fetchTradingAccReq: ({ username }) => {
            dispatch(fetchTradingAccReq({ username }))
        },
        fetchCurrencyRateReq: () => {
            dispatch(fetchCurrencyRateReq())
        },
        fetchTypeOrderReq: () => {
            dispatch(fetchTypeOrderReq())
        },
        fetchStatusOrderReq: () => {
            dispatch(fetchStatusOrderReq())
        },
        updateOfferReq: (body) => {
            dispatch(updateOfferReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferListContainer);