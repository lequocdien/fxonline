import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import appReducer from './reducers';
import LoginContainer from './containers/LoginContainer';
import OfferContainer from './containers/OfferContainer';
import OfferListContainer from './containers/OfferListContainer';
import UserGroupContainer from './containers/UserGroupContainer';
import TraderContainer from './containers/TraderContainer';
import StaffContainer from './containers/StaffContainer';
import TradingAccContainer from './containers/TradingAccContainer';
import AssetInfoContainer from './containers/AssetInfoContainer';
import DepositContainer from './containers/DepositContainer';
import WithdrawalContainer from './containers/WithdrawalContainer';
import OrderHistoryContainer from './containers/OrderHistoryContainer';
import TradingAccHistoryContainer from './containers/TradingAccHistoryContainer';
import RevenueContainer from './containers/RevenueContainer';

const store = createStore(appReducer, applyMiddleware(thunk));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('accessToken')
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
)

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={LoginContainer} />
            <PrivateRoute path="/manager-group-user" exact component={({ location }) => <UserGroupContainer location={location} />} />
            <PrivateRoute path="/manager-trader" exact component={TraderContainer} />
            <PrivateRoute path="/manager-staff" exact component={StaffContainer} />
            <PrivateRoute path="/asset-info" exact component={AssetInfoContainer} />
            <PrivateRoute path="/manager-trading-acc" exact component={TradingAccContainer} />
            <PrivateRoute path="/deposit" exact component={DepositContainer} />
            <PrivateRoute path="/withdrawal" exact component={WithdrawalContainer} />
            <PrivateRoute path="/order-ex" exact component={OfferContainer} />
            <PrivateRoute path="/manager-status-order" exact component={OfferListContainer} />
            <PrivateRoute path="/order-history" exact component={OrderHistoryContainer} />
            <PrivateRoute path="/trading-acc-history" exact component={TradingAccHistoryContainer} />
            <PrivateRoute path="/revenue" exact component={RevenueContainer} />
            <Route path="/" component={LoginContainer} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
};

export default App;