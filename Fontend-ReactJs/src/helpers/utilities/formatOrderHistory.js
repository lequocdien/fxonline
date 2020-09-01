import _ from 'lodash';

const formatOrderHistory = (lst) => {
    return _.map(lst, (item, index) => {
        return {
            ...item,
            key: index
        }
    })
}

export default formatOrderHistory;