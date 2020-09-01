import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu/Menu';
import { fetchListMenuReq } from '../actions/menu.action';
import formatMenu from '../helpers/utilities/formatMenu';

const MenuContainer = (props) => {

    const lstMenu = formatMenu(props.menus.rows);
    useEffect(() => {
        props.fetchListMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Menu menus={lstMenu} />
    );
};

const mapStateToProps = state => {
    return {
        menus: state.menus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListMenu: () => {
            dispatch(fetchListMenuReq())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);