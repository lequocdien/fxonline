import _ from 'lodash';

const formatTrader = (lstTrader) => {
    return _.map(lstTrader, (trader, index) => {
        return {
            ...trader,
            key: index
        }
    })
}

export default formatTrader;