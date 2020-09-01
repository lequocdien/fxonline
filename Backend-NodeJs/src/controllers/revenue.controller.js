const { execFunc } = require('../db');

const list = (req, res, next) => {
    const { usr } = res.identity;
    execFunc('fn_get_revenue($1::varchar)', [usr])
        .then(response => res.send(response))
        .catch(err => next(err));
}

module.exports = {
    list
}