const _ = require('lodash');

const menuViewModel = (data) => {
    // var menuTemp = _.map(arrMenu, (item) => {
    //     return (
    //         {
    //             name: item.functionary_name,
    //             path: item.functionay_path,
    //             subMenu: [
    //                 {
    //                     name: item.role_name,
    //                     path: item.role_path
    //                 }
    //             ]
    //         }
    //     )
    // })
    // const menus = [{ ...menuTemp[0], subMenu: [] }];
    // for (var i = 0; i < menuTemp.length; i++) {
    //     var index = _.findIndex(menus, (item) => item.name === menuTemp[i].name);

    //     if (index === -1) {
    //         menus.push({ ...menuTemp[i] })
    //     }
    //     else {
    //         menus[index].subMenu.push(menuTemp[i].subMenu[0]);
    //     }
    // }
    // return menus;
    var res = _.chain(data)
        .groupBy('functionary_name')
        .map((value, key) => {
            return {
                functionaryId: value[0].functionary_id,
                functionaryName: key,
                functionaryPath: value[0].functionary_path,
                role: _.chain(value)
                    .groupBy('role_name')
                    .map((value, key) => {

                        return {
                            roleId: value[0].role_id,
                            roleName: key,
                            rolePath: value[0].role_path,
                            claim: _.map(value, o => {
                                return {
                                    isSelect: value[0].is_select,
                                    isInsert: value[0].is_insert,
                                    isUpdate: value[0].is_update,
                                    isDelete: value[0].is_delete,
                                }
                            })
                        }
                    }).value()
            }
        })
        .value();
    return res;
}

module.exports = menuViewModel