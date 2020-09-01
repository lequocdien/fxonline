const { execFunc } = require('../db/index');
const menuViewModel = require('../helpers/utilis/menuViewModel');

const list = (req, res, next) => {
    const { usr } = res.identity;
    execFunc('fn_get_menu($1::text)', [usr])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list
}