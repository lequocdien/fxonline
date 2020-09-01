import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../layouts/Offer/Offer';
import { fetchCurrencyRateReq } from '../actions/currencyRate.action';
import { fetchTradingAccReq } from '../actions/tradingAcc.action';
import { fetchTraderByTradingAccReq, resetTrader } from '../actions/trader.action';
import { createOfferReq } from '../actions/offer.action';
import { fetchTypeOrderReq } from '../actions/typeOrder.action';
import getPayloadToken from '../helpers/utilities/getPayloadToken';

const OrderContainer = (props) => {
    const { usr } = getPayloadToken();
    useEffect(() => {
        props.fetchCurrencyRateReq();
        props.fetchTradingAccReq({ username: usr });
        props.fetchTypeOrderReq();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Order
            currencyRate={props.currencyRate.rows}
            tradingAcc={props.tradingAcc.rows}
            typeOrder={props.typeOrder.rows}
            trader={props.trader.rows[0]}
            fetchTraderByTradingAccReq={props.fetchTraderByTradingAccReq}
            createOfferReq={props.createOfferReq}
            onResetTrader={props.resetTrader}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        currencyRate: state.currencyRate,
        tradingAcc: state.tradingAcc,
        typeOrder: state.typeOrder,
        trader: state.trader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrencyRateReq: () => {
            dispatch(fetchCurrencyRateReq());
        },
        fetchTradingAccReq: (body) => {
            dispatch(fetchTradingAccReq(body));
        },
        fetchTypeOrderReq: () => {
            dispatch(fetchTypeOrderReq());
        },
        fetchTraderByTradingAccReq: ({ tradingAcc }) => {
            dispatch(fetchTraderByTradingAccReq({ tradingAcc }));
        },
        resetTrader: () => {
            dispatch(resetTrader());
        },
        createOfferReq: (body) => {
            dispatch(createOfferReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);