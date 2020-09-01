import _ from 'lodash';

const formatDataSourceOffer = (lstOffer) => {
    return _.map(lstOffer, offer => {
        return{
            key: offer.offer_id,
            offer_id: offer.offer_id,
            status: offer.status,
            trading_acc_id: offer.trading_acc_id,
            is_buy: offer.is_buy,
            curency_rate_id: offer.curency_rate_id,
            name: offer.name,
            quantity: offer.quantity,
            price: offer.price,
            user_name: offer.user_name,
            time: offer.time,
            date: offer.date
        }
    })
}

export default formatDataSourceOffer;