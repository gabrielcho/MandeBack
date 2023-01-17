const Joi = require('joi');

const createListing = {
    body: Joi.object().keys({
        serviceId: Joi.number().integer().required(),
        unit: Joi.string().min(1).max(10).required(),
        price: Joi.number().integer().positive().required(),
        title: Joi.string().min(1).max(100).required(),
        description: Joi.string().min(15).max(300).required()
    },)
}

module.exports = {
    createListing
}