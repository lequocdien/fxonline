import React, { useEffect } from 'react';
import Staff from '../layouts/Staff/Staff';
import { connect } from 'react-redux';
import formatStaff from '../helpers/utilities/formatStaff';
import { fetchStaffReq, createStaffReq, updateStaffReq, deleteStaffReq } from '../actions/staff.action';
import { fetchUserGroupReq } from '../actions/userGroup.action';

const TraderContainer = (props) => {
    const lstStaff = formatStaff(props.staff.rows);
    useEffect(() => {
        props.fetchStaffReq();
        props.fetchUserGroupReq();
    }, [])

    return (
        <Staff
            staffs={lstStaff}
            group={props.group.rows}
            createStaffReq={props.createStaffReq}
            updateStaffReq={props.updateStaffReq}
            deleteStaffReq={props.deleteStaffReq}
        />
    );
};

const mapStateToProps = state => {
    return {
        staff: state.staff,
        group: state.userGroup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStaffReq: () => {
            return dispatch(fetchStaffReq());
        },
        fetchUserGroupReq: () => {
            return dispatch(fetchUserGroupReq());
        },
        createStaffReq: (body) => {
            return dispatch(createStaffReq(body));
        },
        updateStaffReq: (body) => {
            return dispatch(updateStaffReq(body));
        },
        deleteStaffReq: (body) => {
            return dispatch(deleteStaffReq(body));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraderContainer);