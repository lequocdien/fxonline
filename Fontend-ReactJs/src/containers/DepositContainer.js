import React, { useEffect } from 'react';
import Deposit from '../layouts/Deposit/Deposit';
import { connect } from 'react-redux';
import getPayloadToken from '../helpers/utilities/getPayloadToken';
import { fetchTradingAccReq } from '../actions/tradingAcc.action';
import { depositReq } from '../actions/deposit.action';

const DepositContainer = (props) => {
    const { usr } = getPayloadToken();
    useEffect(() => {
        props.fetchTradingAccReq({ username: usr });
    }, [])

    return (
        <div>
            <Deposit
                tradingAcc={props.tradingAcc.rows}
                depositReq={props.depositReq}
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
        depositReq: (body) => {
            dispatch(depositReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositContainer);