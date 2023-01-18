const Joi = require('joi');

const createWorker = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        names: Joi.string().min(1).max(20).required(),
        lastNames: Joi.string().min(1).max(20).required(),
        address: Joi.string().min(1).max(20).required(),
        phone: Joi.string().length(10).required(),
        password: Joi.string().required(),
        cc: Joi.string().required()
    })
}

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
    createListing,
    createWorker,
}