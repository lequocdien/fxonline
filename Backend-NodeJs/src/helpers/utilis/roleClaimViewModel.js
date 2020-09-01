const _ = require('lodash');

const roleClaimViewModel = (response) => {
    return _.chain(response).groupBy('functionary_id').map((value, key) => {
        return {
            key: key,
            title: value[0].functionary_name,
            children: _.chain(value).groupBy('role_id').map((value, key) => {
                return {
                    key: key,
                    title: value[0].role_name,
                    children: [
                        {
                            key: `${key}-select`,
                            title: 'Xem'
                        },
                        {
                            key: `${key}-insert`,
                            title: 'Thêm'
                        },
                        {
                            key: `${key}-update`,
                            title: 'Sửa'
                        },
                        {
                            key: `${key}-delete`,
                            title: 'Xóa'
                        },
                    ]
                }
            }).value()
        }
    }).value()
}

module.exports = roleClaimViewModel;