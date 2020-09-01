import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTradingAccReq, createTradingAccReq } from '../actions/tradingAcc.action';
import getPayloadToken from '../helpers/utilities/getPayloadToken';
import formatTradingAcc from '../helpers/utilities/formatTradingAcc';
import TradingAcc from '../layouts/TradingAcc/TradingAcc';

const TradingAccContainer = (props) => {
    const { usr } = getPayloadToken(localStorage.getItem('accessToken'));
    useEffect(() => {
        props.fetchTradingAccReq({ username: usr });
    }, [])

    return (
        <TradingAcc
            tradingAcc={formatTradingAcc(props.tradingAcc.rows)}
            createTradingAccReq={props.createTradingAccReq}
        />
    );
};

const mapStateToProps = state => {
    return {
        tradingAcc: state.tradingAcc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTradingAccReq: ({ username }) => {
            dispatch(fetchTradingAccReq({ username }))
        },
        createTradingAccReq: ({ pass }) => {
            dispatch(createTradingAccReq({ pass }))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingAccContainer);