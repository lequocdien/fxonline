const Joi = require('joi');
const { execFunc } = require("../db");
const updateRoleClaimValidation = require('../helpers/validations/updateRoleClaim.validation');

const list = (req, res, next) => {
    const { group } = req.query;
    if (!group) {
        return next({
            statusCode: 400,
            payload: error.details[0].message
        });
    }

    execFunc('fn_get_role_claim($1::text)', [group])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const updateByClaimId = (req, res, next) => {
    const body = req.body;
    const { error } = updateRoleClaimValidation.validate(body);
    if (error) {
        return next({
            statusCode: 400,
            payload: error.details[0].message
        });
    }
    execFunc('fn_update_role_claim($1::text)', [JSON.stringify(body)])
        .then(data => res.send(data))
        .catch(err => next(err))
}

module.exports = {
    list,
    updateByClaimId
}