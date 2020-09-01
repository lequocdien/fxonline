const Joi = require('joi');

const schemaInsertTrader = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.bool().required(),
    identityCard: Joi.string().required(),
    issuedBy: Joi.string().required(),
    issuedOn: Joi.date().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().allow(null),
    userName: Joi.string().required(),
    groupId: Joi.number().integer().required(),
})

const schemaUpdateTrader = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.bool().required(),
    identityCard: Joi.string().required(),
    issuedBy: Joi.string().required(),
    issuedOn: Joi.date().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().allow(null),
    userName: Joi.string().required(),
    status: Joi.number().integer().required(),
    accountId: Joi.number().integer().required(),
})

module.exports = {
    schemaInsertTrader,
    schemaUpdateTrader
};