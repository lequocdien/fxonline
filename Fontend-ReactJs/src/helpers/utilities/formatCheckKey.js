import _ from 'lodash';

const formatCheckKey = (currentCheckKeys, groupId, leafKeys) => {
    var allKeys = _.chain(leafKeys).map(value => {
        var arrTemp = _.split(value, '-');
        return {
            MaNhomQuyen: groupId,
            MaQuyen: parseInt(arrTemp[1]),
            Quyen: parseInt(arrTemp[2])
        }
    }).groupBy('MaQuyen').map((value, key) => {
        return {
            MaNhomQuyen: groupId,
            MaQuyen: value[0].MaQuyen,
            Xem: false,
            Them: false,
            Sua: false,
            Xoa: false,
        }
    }).value();

    var checkedKeys = _.chain(currentCheckKeys).map(value => {
        var arrTemp = _.split(value, '-');
        return {
            MaNhomQuyen: groupId,
            MaQuyen: parseInt(arrTemp[1]),
            Quyen: parseInt(arrTemp[2])
        }
    }).groupBy('MaQuyen').map((value, key) => {
        var Xem = false;
        var Them = false;
        var Sua = false;
        var Xoa = false;
        for (var i = 0; i < value.length; i++) {
            if (value[i].Quyen === 1) {
                Xem = true;
            }
            else if (value[i].Quyen === 2) {
                Them = true;
            }
            else if (value[i].Quyen === 3) {
                Sua = true;
            }
            else if (value[i].Quyen === 4) {
                Xoa = true;
            }
        };
        return {
            MaNhomQuyen: groupId,
            MaQuyen: value[0].MaQuyen,
            Xem,
            Them,
            Sua,
            Xoa,
        }
    }).value();

    return _.chain(allKeys).map(item => {
        var index = _.findIndex(checkedKeys, o => o.MaQuyen === item.MaQuyen);
        if (index === -1) {
            return item;
        }
        else {
            return {
                ...item,
                Xem: checkedKeys[index].Xem,
                Them: checkedKeys[index].Them,
                Sua: checkedKeys[index].Sua,
                Xoa: checkedKeys[index].Xoa,
            }
        }
    }).value();
}

export default formatCheckKey;