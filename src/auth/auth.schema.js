'use strict'

const Joi = require('joi')

let schema = {}

schema.login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})


schema.response = Joi.object().keys({token: Joi.string().required().description('Token do usuario.'),})


module.exports = schema