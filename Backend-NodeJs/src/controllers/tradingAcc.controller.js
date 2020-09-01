const { execFunc } = require("../db/postgresql.db")

const list = (req, res, next) => {
    const { username } = req.query;
    execFunc('fn_get_trading_acc($1::text)', [username])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const create = (req, res, next) => {
    const { pass } = req.body;
    const { usr } = res.identity;
    execFunc('fn_add_trading_acc($1::text, $2::text)', [usr, pass])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list,
    create
}