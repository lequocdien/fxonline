import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTradingAccReq } from '../actions/tradingAcc.action';
import { fetchTradingAccHistoryReq } from '../actions/tradingAccHistory.action';
import TradingAccHistory from '../layouts/TradingAccHistory/TradingAccHistory';
import getPayloadToken from '../helpers/utilities/getPayloadToken';
import formatTradingAccHistory from '../helpers/utilities/formatTradingAccHistory';

const OrderHistoryContainer = (props) => {
    const { usr } = getPayloadToken();

    useEffect(() => {
        props.fetchTradingAccReq({ username: usr })
    }, []);

    return (
        <div>
            <TradingAccHistory
                tradingAcc={props.tradingAcc.rows}
                tradingAccHistory={formatTradingAccHistory(props.tradingAccHistory.rows)}
                fetchTradingAccHistoryReq={props.fetchTradingAccHistoryReq}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tradingAcc: state.tradingAcc,
        tradingAccHistory: state.trandingAccHistory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTradingAccReq: ({ username }) => {
            dispatch(fetchTradingAccReq({ username }))
        },
        fetchTradingAccHistoryReq: (params) => {
            dispatch(fetchTradingAccHistoryReq(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryContainer);