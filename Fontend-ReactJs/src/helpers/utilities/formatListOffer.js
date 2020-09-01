import _ from 'lodash';

const formatListOffer = (lstOffer) => {
    return _.map(lstOffer, (offer, index) => {
        return {
            ...offer,
            key: index
        }
    })
}

export default formatListOffer;