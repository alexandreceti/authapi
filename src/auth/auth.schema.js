'use strict'

const Joi = require('joi')

let schema = {}

schema.login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

schema.responseInfo = Joi.object().keys({
  credentials: Joi.object().keys({
    id: Joi.string().uuid().optional(),
    name: Joi.string().min(3).max(60).required(),
    last_name: Joi.string().allow('').optional(),
    scope: Joi.string().required().valid('admin', 'partner', 'user'),
    avatar: Joi.string().optional(),
    email: Joi.string().email().required(),
    iat: Joi.number(),
    created_at: Joi.date(),
    updated_at: Joi.date()
  })
})
schema.isValid = Joi.object().keys({
  valid: Joi.boolean()
})

schema.response = Joi.object().keys({ token: Joi.string().required().description('Token do usuario.') })

module.exports = schema
