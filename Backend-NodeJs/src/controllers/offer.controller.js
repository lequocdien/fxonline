const jwt = require('jsonwebtoken');
const { execFunc } = require('../db');
const { schemaCreate, schemaUpdateById } = require('../helpers/validations/offer.validation');
const { SECRET_KEY } = require('../configs/authentication');
const { CHO_KHOP } = require('../configs/sysDefine/offer.config');

const list = (req, res, next) => {
    const { usr } = res.identity;
    execFunc('fn_get_offer($1::text)', [usr])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const create = (req, res, next) => {
    // const { error } = schemaCreate.validate({ ...req.body });
    // if (error) {
    //     return next({
    //         statusCode: 400,
    //         payload: error.details[0].message
    //     });
    // }

    jwt.verify(req.headers['x-access-token'], SECRET_KEY, (err, decoded) => {
        if (err) {
            next();
        }
        else {
            const { quantity, price, description, trading_acc_id, currency_rate_id, type_order_id } = { ...req.body };
            const { usr } = decoded;

            execFunc('fn_add_offer($1::varchar, $2::int4, $3::float4, $4::varchar, $5::int4, $6::integer, $7::int4, $8::int4)', [usr, quantity, price, description, trading_acc_id, currency_rate_id, type_order_id, CHO_KHOP])
                .then(data => res.send(data))
                .catch(err => next(err));
        }
    })
}

const updateByOfferId = (req, res, next) => {
    const { usr } = res.identity;
    const { trading_acc_id, currency_rate_id, quantity, type_order_id, price, status_order_id, order_id, description } = req.body;
    // const { error } = schemaUpdateById.validate({ tradingAccId, currencyRateId, quantity, isbuy, price, status, offerId });
    // if (error) {
    //     return next({
    //         statusCode: 400,
    //         payload: error.details[0].message
    //     });
    // }
    execFunc('fn_update_offer($1::varchar, $2::int4, $3::int4, $4::float4, $5::varchar, $6::int4, $7::int4, $8::int4, $9::int4)', [usr, order_id, quantity, price, description, trading_acc_id, currency_rate_id, type_order_id, status_order_id])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list,
    create,
    updateByOfferId
}