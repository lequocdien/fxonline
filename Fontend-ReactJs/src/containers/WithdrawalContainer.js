import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getPayloadToken from '../helpers/utilities/getPayloadToken';
import { fetchTradingAccReq } from '../actions/tradingAcc.action';
import { withdrawalReq } from '../actions/withdrawal.action';
import Withdrawal from '../layouts/Withdrawal/Withdrawal';

const DepositContainer = (props) => {
    const { usr } = getPayloadToken();
    useEffect(() => {
        props.fetchTradingAccReq({ username: usr });
    }, [])

    return (
        <div>
            <Withdrawal
                tradingAcc={props.tradingAcc.rows}
                withdrawalReq={props.withdrawalReq}
            />
        </div>
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
        withdrawalReq: (body) => {
            dispatch(withdrawalReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositContainer);