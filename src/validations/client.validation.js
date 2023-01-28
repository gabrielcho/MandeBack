const Joi = require('joi');

const createClient = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        names: Joi.string().min(1).max(20).required(),
        lastNames: Joi.string().min(1).max(20).required(),
        address: Joi.string().min(1).max(20).required(),
        phone: Joi.string().length(10).required(),
        password: Joi.string().required(),
        cc: Joi.string().required(),
        creditCard: Joi.number().integer()
    })
};

const startContract = {
    body: Joi.object().keys({
        units: Joi.number().integer().min(1).max(100)
    })
};

module.exports = {createClient, startContract};