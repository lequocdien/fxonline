import _ from 'lodash';

const formatTradingAccHistory = (lst) => {
    return _.map(lst, (item, index) => {
        return {
            ...item,
            key: index
        }
    })
}

export default formatTradingAccHistory;