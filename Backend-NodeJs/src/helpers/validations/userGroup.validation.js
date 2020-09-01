const Joi = require('joi');

const schemaInsertUserGroup = Joi.object({
    groupName: Joi.string().max(50).required(),
    isActive: Joi.boolean().required(),
    description: Joi.string().allow('').max(255)
})

const schemaUpdateUserGroup = Joi.object({
    groupName: Joi.string().max(50).required(),
    isActive: Joi.boolean().required(),
    description: Joi.string().allow('').max(255),
    groupId: Joi.number().required()
})

module.exports = {
    schemaInsertUserGroup,
    schemaUpdateUserGroup
}