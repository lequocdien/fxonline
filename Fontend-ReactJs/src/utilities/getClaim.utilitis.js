import _ from 'lodash';

const getClaim = (arrtMenu, funcId, roleId) => {
    var lstClaim = [];
    var func = _.find(arrtMenu, o => o.functionaryId === funcId);
    lstClaim = _.find(func?.role, o => o.roleId === roleId)?.claim;
    return lstClaim;
}

export default getClaim;