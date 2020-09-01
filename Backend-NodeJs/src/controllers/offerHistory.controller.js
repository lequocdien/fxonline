const { execFunc } = require('../db');

const list = (req, res, next) => {
    const { order_id } = req.query;
    execFunc('fn_get_offer_history($1::int4)', [order_id])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list
}