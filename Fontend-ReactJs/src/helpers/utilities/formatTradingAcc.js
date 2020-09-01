import _ from 'lodash';

const formatTradingAcc = (lst) => {
    return _.map(lst, (tradingAcc, index) => {
        return {
            ...tradingAcc,
            key: index,
        }
    })
}

export default formatTradingAcc;