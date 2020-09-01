const _ = require('lodash');
const { size } = require('lodash');

var arr = [
    "6-select",
    "7-select",
    "8-select",
    "4-select",
    "5-select",
    "1-select",
    "2-select",
    "3-select",
    "9-select",
    "9-insert"
]

var data = _.chain(arr).map(value => {
    var arrTemp = _.split(value, '-');
    return {
        id: arrTemp[0],
        claim: arrTemp[1]
    }
}).groupBy('id').map((value, key) => {
    var isSelect = false;
    var isInsert = false;
    var isUpdate = false;
    var isDelete = false;

    for (var i = 0; i < size(value); i++) {
        if (value[i].claim === 'select') {
            isSelect = true;
        }
        else if (value[i].claim === 'insert') {
            isInsert = true;
        }
        else if (value[i].claim === 'update') {
            isUpdate = true;
        }
        else if (value[i].claim === 'delete') {
            isDelete = true;
        }
        
    }

    return {
        id: parseInt(key),
        isSelect,
        isInsert,
        isUpdate,
        isDelete
    }
}).value();

console.log(data)