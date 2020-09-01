const { execFunc } = require("../db");

const list = (req, res, next) => {
    execFunc('fn_get_status_order()')
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list
}