import { combineReducers } from 'redux';
import currencyRate from './currencyRate.reducer';
import login from './login.reducer';
import menus from './menu.reducer';
import tradingAccount from './tradingAccount.reducer';
import typeOrder from './typeOrder.reducer';
import statusOrder from './statusOrder.reducer';
import trader from './trader.reducer';
import staff from './staff.reducer';
import offer from './offer.reducer';
import userGroup from './userGroup.reducer';
import roleClaim from './roleClaim.reducer';
import asset from './assetInfo.reducer';
import offerHistory from './offerHistory.reducer';
import trandingAccHistory from './tradingAccHistory.reducer';
import revenue from './revenue.reducer';

const appReducer = combineReducers({
    login,
    menus,
    currencyRate,
    typeOrder,
    tradingAcc: tradingAccount,
    statusOrder,
    trader,
    staff,
    offer,
    userGroup,
    roleClaim,
    asset,
    offerHistory,
    trandingAccHistory,
    revenue
})

export default appReducer;