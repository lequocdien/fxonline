import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

const Search = (props) => {

    const { accessToken } = props.accessToken;
    const payload = accessToken.split('.')[1] || '';
    const infoUser = JSON.parse(atob(payload));

    return (
        <nav className="navbar top-navbar col-lg-12 col-12 p-0">
            <div className="container">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" to="/">
                        <img src="https://fss.com.vn/uploaded/logo/logofss.png" alt="logo" />
                    </Link>
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/dashboard/images/logo-mini.svg" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">
                                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                    <span className="input-group-text" id="search">
                                        <i className="mdi mdi-magnify" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search" aria-label="search" aria-describedby="search" />
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                            <a className="nav-link" id="profileDropdown" href="/" data-toggle="dropdown" aria-expanded="false">
                                <div className="nav-profile-img">
                                    <img src="assets/dashboard/images/faces/face1.jpg" alt="face1" />
                                </div>
                                <div className="nav-profile-text">
                                    <p className="text-black font-weight-semibold m-0"> {`${infoUser.usr}`} </p>
                                    <span className="font-13 online-color text-success">{infoUser.grp || 'NO AUTH'}<i className="mdi mdi-chevron-down" /></span>
                                </div>
                            </a>
                            <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                                {/* <a className="dropdown-item" href="/">
                                    <i className="mdi mdi-cached mr-2 text-success" /> Activity Log </a>
                                <div className="dropdown-divider" /> */}
                                <Link
                                    className="dropdown-item"
                                    to="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        localStorage.removeItem('accessToken');
                                        window.location.reload();
                                    }}>
                                    <i className="mdi mdi-logout mr-2 text-primary" /> Signout
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                        <span className="mdi mdi-menu" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Search;