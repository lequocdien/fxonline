import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRevenueReq } from '../actions/revenue.action';
import Revenue from '../layouts/Revenue/Revenue';
import addFieldKey from '../helpers/utilities/addFieldKey';

const RevenueContainer = (props) => {

    useEffect(() => {
        props.fetchRevenueReq();
    }, [])

    return (
        <Revenue
            revenues={addFieldKey(props.revenue.rows)}
        />
    );
};

const mapStateToProps = state => {
    return {
        revenue: state.revenue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRevenueReq: () => {
            dispatch(fetchRevenueReq());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RevenueContainer);