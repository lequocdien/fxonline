import _ from 'lodash';

const formatMenu = (data) => {
    var res = _.chain(data)
        .filter(o => o.is_select === true)
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

        }).value();
    
    return res;
}

export default formatMenu;