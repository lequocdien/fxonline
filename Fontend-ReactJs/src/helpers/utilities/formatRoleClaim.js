import _ from 'lodash';

const formatRoleClaim = (response) => {
    var checkedKeys = [];
    var leafKeys = [];
    var treeData = [];

    for (var i = 0; i < _.size(response); i++) {
        if (response[i].Xem) {
            checkedKeys.push(`${response[i].MaChucNang}-${response[i].MaQuyen}-1`);
        }
        if (response[i].Them) {
            checkedKeys.push(`${response[i].MaChucNang}-${response[i].MaQuyen}-2`);
        }
        if (response[i].Sua) {
            checkedKeys.push(`${response[i].MaChucNang}-${response[i].MaQuyen}-3`);
        }
        if (response[i].Xoa) {
            checkedKeys.push(`${response[i].MaChucNang}-${response[i].MaQuyen}-4`);
        }
    }

    for (var i = 0; i < _.size(response); i++) {
        if (response[i].MaQuyen) {
            leafKeys.push(`${response[i].MaChucNang}-${response[i].MaQuyen}-1`);
        }
    }

    treeData = _.chain(response).groupBy('MaChucNang').map(value => {
        return {
            disabled: value[0].MaQuyen ? false : true,
            key: value[0].MaChucNang,
            title: value[0].TenChucNang,
            children: value[0].MaQuyen ? _.chain(value).map(value => {
                return {
                    key: `${value.MaChucNang}-${value.MaQuyen}`,
                    title: value.TenQuyen,
                    children: [
                        {
                            key: `${value.MaChucNang}-${value.MaQuyen}-1`,
                            title: 'Xem'
                        },
                        {
                            key: `${value.MaChucNang}-${value.MaQuyen}-2`,
                            title: 'Thêm'
                        },
                        {
                            key: `${value.MaChucNang}-${value.MaQuyen}-3`,
                            title: 'Sửa'
                        },
                        {
                            key: `${value.MaChucNang}-${value.MaQuyen}-4`,
                            title: 'Xóa'
                        },
                    ]
                }
            }).value() : []
        }
    }).value();

    return {
        checkedKeys,
        leafKeys,
        treeData
    }
}

export default formatRoleClaim;