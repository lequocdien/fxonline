import _ from 'lodash';

const addFieldKey = (lst) => {
    return _.map(lst, (item, index) => {
        return {
            ...item,
            key: index
        }
    })
}

export default addFieldKey;