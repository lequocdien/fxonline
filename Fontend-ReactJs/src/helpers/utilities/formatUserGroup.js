import _ from 'lodash';

const formatUserGroup = (lstUserGroup) => {
    return _.map(lstUserGroup, (userGroup) => {
        return {
            key: userGroup.group_id,
            groupId: userGroup.group_id,
            groupName: userGroup.group_name,
            status: userGroup.is_active,
            description: userGroup.description
        }
    })
}

export default formatUserGroup;