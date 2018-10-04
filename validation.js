const Joi = require('joi');

const Movie = Joi.object().keys({
    _id: Joi.string(),
    title: Joi.string().required().min(4),
    description: Joi.string().min(10).allow(''),
    releaseDate: Joi.date(),
    actors: Joi.array().items(Joi.any())
});

const Actor = Joi.object().keys({
    _id: Joi.string(),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    bio: Joi.string()
});

module.exports = {Movie, Actor};