const Joi = require('Joi');

const createListing = {
    body: Joi.object().keys({
        key: 'key'
    },)
}