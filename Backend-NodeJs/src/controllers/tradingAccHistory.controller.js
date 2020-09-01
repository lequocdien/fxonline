const { execFunc } = require('../db');

const list = (req, res, next) => {
    const { trading_acc_id } = req.query;
    execFunc('fn_get_trading_acc_history($1::int4)', [trading_acc_id])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list
}