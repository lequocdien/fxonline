const Joi = require('joi');

const schema = Joi.array().items(({
    MaNhomQuyen: Joi.number().integer().required(),
    MaQuyen: Joi.number().integer().required(),
    Xem: Joi.bool().required(),
    Them: Joi.bool().required(),
    Sua: Joi.bool().required(),
    Xoa: Joi.bool().required(),
}))

module.exports = schema;