import _ from 'lodash';
import React, { useEffect } from 'react';
import Trader from '../layouts/Trader/Trader';
import { connect } from 'react-redux';
import { fetchTraderReq, createTraderReq, updateTraderReq, deleteTraderReq } from '../actions/trader.action';
import { fetchUserGroupReq } from '../actions/userGroup.action';
import formatTrader from '../helpers/utilities/formatTrader';

const TraderContainer = (props) => {
    const lstTrader = formatTrader(props.trader.rows);
    useEffect(() => {
        props.fetchTraderReq();
        props.fetchUserGroupReq();
    }, [])

    return (
        <Trader
            traders={lstTrader}
            group={props.group.rows}
            createTraderReq={props.createTraderReq}
            updateTraderReq={props.updateTraderReq}
            deleteTraderReq={props.deleteTraderReq}
        />
    );
};

const mapStateToProps = state => {
    return {
        trader: state.trader,
        group: state.userGroup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTraderReq: () => {
            return dispatch(fetchTraderReq());
        },
        fetchUserGroupReq: () => {
            return dispatch(fetchUserGroupReq());
        },
        createTraderReq: (body) => {
            return dispatch(createTraderReq(body));
        },
        updateTraderReq: (body) => {
            return dispatch(updateTraderReq(body));
        },
        deleteTraderReq: (body) => {
            return dispatch(deleteTraderReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraderContainer);