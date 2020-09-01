const { execFunc } = require("../db");
const { schemaInsertUserGroup, schemaUpdateUserGroup } = require('../helpers/validations/userGroup.validation');

const list = (req, res, next) => {
    execFunc('fn_get_group()')
        .then(data => res.send(data))
        .catch(err => next(err));
}

const create = (req, res, next) => {
    const { groupName, isActive, description } = req.body;
    const { error } = schemaInsertUserGroup.validate({ groupName, isActive, description });
    if (error) {
        return next({
            statusCode: 400,
            payload: error.details[0].message
        });
    }
    execFunc('fn_add_group($1::text, $2::bool, $3::text)', [groupName, isActive, description])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const updateByGroupId = (req, res, next) => {
    const { groupName, isActive, description, groupId } = req.body;
    // const { error } = schemaUpdateUserGroup.validate({ groupName, isActive, description, groupId });
    // if (error) {
    //     return next({
    //         statusCode: 400,
    //         payload: error.details[0].message
    //     });
    // }
    execFunc('fn_update_group($1::text, $2::bool, $3::text, $4::integer)', [groupName, isActive, description, groupId])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const deleteByGroupId = (req, res, next) => {
    const { groupId } = req.body;
    if (!groupId) {
        return next({
            statusCode: 400,
            payload: 'groupId is not null.'
        });
    }
    execFunc('fn_delete_group($1::integer)', [groupId])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    list,
    create,
    updateByGroupId,
    deleteByGroupId
}