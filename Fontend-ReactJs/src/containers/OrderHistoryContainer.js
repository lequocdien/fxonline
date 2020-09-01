import React, { useEffect } from 'react';
import OrderHistory from '../layouts/OrderHistory/OrderHistory';
import { connect } from 'react-redux';
import { fetchOfferHistroyReq } from '../actions/offerHistory.action';
import formatOrderHistory from '../helpers/utilities/formatOrderHistory';
import { fetchOfferReq } from '../actions/offer.action';

const OrderHistoryContainer = (props) => {
    useEffect(() => {
        props.fetchListOfferReq()
    }, []);

    return (
        <div>
            <OrderHistory
                offers={props.offers.rows}
                offerHistory={formatOrderHistory(props.offerHistory.rows)}
                fetchOfferHistroyReq={props.fetchOfferHistroyReq}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        offerHistory: state.offerHistory,
        offers: state.offer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListOfferReq: () => {
            dispatch(fetchOfferReq());
        },
        fetchOfferHistroyReq: (param) => {
            dispatch(fetchOfferHistroyReq(param));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryContainer);