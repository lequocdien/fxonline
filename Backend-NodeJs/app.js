const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./src/middlewares/auth');
const errorHandle = require('./src/middlewares/error.handle');
const authRoutes = require('./src/routes/login.route');
const menuRoutes = require('./src/routes/menu.route');
const currencyRateRoutes = require('./src/routes/currencyRate.route');
const tradingAccRoutes = require('./src/routes/tradingAcc.route');
const typeOrderRoutes = require('./src/routes/typeOrder.route');
const statusOrderRoutes = require('./src/routes/statusOrder.route');
const traderRoutes = require('./src/routes/trader.route');
const offerRoutes = require('./src/routes/offer.route');
const groupRoutes = require('./src/routes/userGroup.route');
const roleClaimRoutes = require('./src/routes/roleClaim.route');
const staffRoutes = require('./src/routes/staff.route');
const assetRoutes = require('./src/routes/assetInfo.route');
const depositRoutes = require('./src/routes/deposit.route');
const withdrawal = require('./src/routes/withdrawal.route');
const offerHistoryRoutes = require('./src/routes/offerHistory.route');
const tradingAccHistoryRoutes = require('./src/routes/tradingAccHistory.route');
const revenueRoutes = require('./src/routes/revenue.route');
const PORT = process.env.PORT || 2000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', authRoutes);
app.use('/api/menu', auth(), menuRoutes);
app.use('/api/currency-rate', auth(), currencyRateRoutes);
app.use('/api/trading-acc', auth(), tradingAccRoutes);
app.use('/api/type-order', auth(), typeOrderRoutes);
app.use('/api/status-order', auth(), statusOrderRoutes);
app.use('/api/trader', auth(), traderRoutes);
app.use('/api/offer', auth(), offerRoutes);
app.use('/api/user-group', auth(), groupRoutes);
app.use('/api/role-claim', auth(), roleClaimRoutes);
app.use('/api/staff', auth(), staffRoutes);
app.use('/api/asset', auth(), assetRoutes);
app.use('/api/deposit', auth(), depositRoutes);
app.use('/api/withdrawal', auth(), withdrawal);
app.use('/api/offer-history', auth(), offerHistoryRoutes);
app.use('/api/trading-acc-history', auth(), tradingAccHistoryRoutes);
app.use('/api/revenue', auth(), revenueRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to FXOnline.</h1>');
})

app.get('/info', auth(), (req, res) => {
    res.send(res.identity);
})

app.use(errorHandle.errorHandler());

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));










// //=========================================TEST==========================================
// // const { Pool } = require('pg');
// // const _ = require('lodash');

// // const pool = new Pool({
// //     user: 'postgres',
// //     host: 'localhost',
// //     database: 'test',
// //     password: '0000',
// //     port: 5432,
// // });

// // pool.connect((err, client, release) => {
// //     client.query('begin;')
// //     client.query(`select fn_resultCursor();`)
// //         .then(res => res)
// //         .then(res => {
// //             return client.query(`fetch all from "dataTest"`)
// //         })
// //         .then(res => { console.log(res); client.query('commit;') })
// //         .catch(err => { console.log(err); client.query('commit;') });
// //     release();
// // });

// // pool.query(`begin;`).then(data => console.log(data));

// // pool.query(`select fn_resultCursor();`).then(data => console.log(data));

// // console.log(_.eq('a', 'a'));