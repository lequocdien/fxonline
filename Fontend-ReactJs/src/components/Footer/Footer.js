import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2020 <i className="mdi mdi-heart text-danger" />. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"><i className="mdi mdi-heart text-danger" /> <i className="mdi mdi-heart text-danger" /></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;