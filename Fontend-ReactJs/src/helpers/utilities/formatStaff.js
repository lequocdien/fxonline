import _ from 'lodash';

const formatStaff = (lstStaff) => {
    return _.map(lstStaff, (staff, index) => {
        return {
            ...staff,
            key: index
        }
    })
}

export default formatStaff;