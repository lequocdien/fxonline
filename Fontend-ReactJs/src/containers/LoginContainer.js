import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../layouts/Login/Login';
import * as action from '../actions/login.action';

const LoginContainer = (props) => {

    useEffect(() => {
        console.log(props)
    })

    return (
        props.login.accessToken ? <Redirect to="/order-ex" /> : <Login onLogin={props.onLogin} />
    );
};

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: ({ username, password }) => {
            dispatch(action.fetchTokenReq({ username, password }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);