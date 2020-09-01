import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('0000');

    const onChangeInput = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        props.onLogin({ username: username, password: password });
    }

    return (
        <div id="login">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-3 col-sm-3 col-md-4 col-lg-4">
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center">Đăng nhập</h1>
                                <form onSubmit={onLogin}>
                                    <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Tên đăng nhập</label>
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="mdi mdi-account"></i></div>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Tên đăng nhập"
                                            name="username"
                                            value={username}
                                            onChange={onChangeInput} />
                                    </div>
                                    <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Mật khẩu</label>
                                    <div className="input-group mb-2 mr-sm-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="mdi mdi-security"></i></div>
                                        </div>
                                        <input type="password" 
                                            className="form-control" 
                                            placeholder="Mật khẩu"
                                            name="password"
                                            value={password}
                                            onChange={onChangeInput} />
                                    </div>
                                    <div className="form-check mx-sm-2">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" defaultChecked /> Remember me <i className="input-helper" /></label>
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-2"> Đăng nhập </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;