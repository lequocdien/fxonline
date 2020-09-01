const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(50).required()
})

module.exports = schema;