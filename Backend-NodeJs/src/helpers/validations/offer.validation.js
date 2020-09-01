const Joi = require('joi');

const schemaCreate = Joi.object({
    description: Joi.string().allow('').max(255),
    isbuy: Joi.boolean().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required(),
    currencyRateId: Joi.number().integer().required(),
    tradingAccId: Joi.number().integer().required()
})

const schemaUpdateById = Joi.object({
    tradingAccId: Joi.number().integer().required(),
    currencyRateId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    isbuy: Joi.boolean().required(),
    price: Joi.number().required(),
    status: Joi.number().required(),
    offerId: Joi.number().required(),
})

module.exports = {
    schemaCreate,
    schemaUpdateById
};