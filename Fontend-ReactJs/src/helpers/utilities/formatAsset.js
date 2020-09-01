import _ from 'lodash';

const formatAsset = (lst) => {
    return _.map(lst, (item, index) => {
        return {
            ...item,
            key: index
        }
    })
}

export default formatAsset;