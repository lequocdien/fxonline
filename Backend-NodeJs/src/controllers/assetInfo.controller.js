const { execFunc } = require('../db');

const list = (req, res, next) => {
    const { usr } = res.identity;
    execFunc('fn_get_asset($1::varchar)', [usr])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list
}