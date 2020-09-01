import React from 'react';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';
import './Menu.css';

const Menu = (props) => {

    const { menus } = props;

    const showContentRole = (listRole, funcId) => {
        return (
            _.map(listRole, (role) => {
                return (
                    <Route key={role.roleId} path={role.rolePath} exact children={({ match }) => {
                        var active = match ? 'active' : '';
                        return (
                            <li className={`nav-item ${active}`}>
                                <Link className="nav-link" to={{
                                    pathname: role.rolePath, state: {
                                        funcId: funcId,
                                        roleId: role.roleId
                                    }
                                }}>{role.roleName}</Link>
                            </li>
                        )
                    }} />
                )
            })
        )
    }

    const showContentFunctionary = (listFunctionary) => {
        var result = null;
        result = _.map(listFunctionary, (func) => {
            if (_.size(func.role) !== 0) {
                return (
                    <li key={func.functionaryId} className="nav-item">
                        <Link to={func.functionaryPath} className="nav-link">
                            <i className="mdi mdi-monitor-dashboard menu-icon" />
                            <span className="menu-title">{func.functionaryName}</span>
                            <i className="menu-arrow" />
                        </Link>
                        <div className="submenu">
                            <ul className="submenu-item">
                                {showContentRole(func.role, func.functionaryId)}
                            </ul>
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <Route key={func.functionaryId} path={func.functionaryPath} exact children={({ match }) => {
                        var active = match ? 'active' : '';
                        return (
                            <li className={`nav-item ${active}`} >
                                <a className="nav-link" href="pages/forms/basic_elements.html">
                                    <i className="mdi mdi-clipboard-text menu-icon" />
                                    <span className="menu-title">{func.functionaryName}</span>
                                </a>
                            </li>
                        )
                    }} />
                )
            }
        })
        return result;
    }

    return (
        <nav className="bottom-navbar">
            <div className="container">
                <ul className="nav page-navigation justify-content-left">
                    {showContentFunctionary(menus)}
                    <li className="nav-item">
                        <div className="nav-link d-flex">
                            <div className="nav-item dropdown">
                                <a className="nav-link count-indicator dropdown-toggle text-white font-weight-semibold" id="notificationDropdown" href="/" data-toggle="dropdown"> English </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                    <a className="dropdown-item" href="/">
                                        <i className="flag-icon flag-icon-bl mr-3" /> French </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="/">
                                        <i className="flag-icon flag-icon-cn mr-3" /> Chinese </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="/">
                                        <i className="flag-icon flag-icon-de mr-3" /> German </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="/">
                                        <i className="flag-icon flag-icon-ru mr-3" />Russian </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;