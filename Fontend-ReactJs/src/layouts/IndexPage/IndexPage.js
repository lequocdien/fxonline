import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import OrderList from '../OrderList/OrderList';
import OrderContainer from '../../containers/OrderContainer';
import Footer from '../../components/Footer/Footer';

const IndexPage = () => {
    return (
        <div className="container-scroller">
            <Header />
            <Switch>
                <Route path="/dashboard/order-ex" component={OrderContainer} />
                <Route path="/dashboard" component={OrderList} />
            </Switch>
            <Footer />
        </div>
    );
};

export default IndexPage;