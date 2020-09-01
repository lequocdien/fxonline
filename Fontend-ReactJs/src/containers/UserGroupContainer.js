import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import UserGroup from '../layouts/UserGroup/UserGroup';
import { fetchUserGroupReq, updateUserGroupReq, insertUserGroupReq, deleteUserGroupReq } from '../actions/userGroup.action';
import { fetchRoleClaimReq, updateRoleClaimReq } from '../actions/roleClaim.action';
import formatRoleClaim from '../helpers/utilities/formatRoleClaim';
import formatUserGroup from '../helpers/utilities/formatUserGroup';

const ManagerGroupContainer = (props) => {
    const lstUserGroup = formatUserGroup(props.userGroup.rows);
    let lstRoleClaim = formatRoleClaim(props.roleClaim.rows);

    useEffect(() => {
        props.fetchUserGroupReq();
    }, [])

    return (
        <UserGroup
            userGroups={lstUserGroup}
            roleClaims={lstRoleClaim}
            fetchRoleClaimReq={props.fetchRoleClaimReq}
            insertUserGroupReq={props.insertUserGroupReq}
            updateUserGroupReq={props.updateUserGroupReq}
            deleteUserGroupReq={props.deleteUserGroupReq}
            updateRoleClaimReq={props.updateRoleClaimReq} />
    );
};

const mapStateToProps = state => {
    return {
        userGroup: state.userGroup,
        roleClaim: state.roleClaim,
        menus: state.menus
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        fetchUserGroupReq: () => {
            return dispatch(fetchUserGroupReq());
        },
        fetchRoleClaimReq: ({ group }) => {
            return dispatch(fetchRoleClaimReq({ group }));
        },
        insertUserGroupReq: ({ groupName, isActive, description }) => {
            return dispatch(insertUserGroupReq({ groupName, isActive, description }));
        },
        updateUserGroupReq: ({ groupName, isActive, description, groupId }) => {
            return dispatch(updateUserGroupReq({ groupName, isActive, description, groupId }));
        },
        deleteUserGroupReq: ({ groupId }) => {
            return dispatch(deleteUserGroupReq({ groupId }));
        },
        updateRoleClaimReq: (body) => {
            return dispatch(updateRoleClaimReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ManagerGroupContainer);