const Joi = require('joi')

let schema = {}

schema.create = Joi.object().keys({
  name: Joi.string().min(4).max(60).required(),
  last_name: Joi.string().allow('').optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
  scope: Joi.string().required().valid('admin', 'partner', 'user'),
  avatar: Joi.string().optional()
})

schema.update = Joi.object().keys({
  name: Joi.string().min(4).max(60).optional(),
  last_name: Joi.string().allow('').optional(),
  email: Joi.string().email().optional(),
  scope: Joi.string().optional().valid('admin', 'partner', 'user'),
  avatar: Joi.string().optional()
})

schema.list = Joi.object().keys({
  query: Joi.string().min(3).max(60).optional().default(''),
  page: Joi.number().optional().default(0),
  pagesize: Joi.number().optional().default(25),
  order: Joi.string().optional().default('name')
})

schema.userModel = Joi.object().keys({
  id: Joi.string().uuid().optional(),
  name: Joi.string().min(3).max(60).required(),
  last_name: Joi.string().allow('').optional(),
  scope: Joi.string().required().valid('admin', 'partner', 'user'),
  avatar: Joi.string().optional(),
  email: Joi.string().email().required(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

schema.response = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(3).max(60).required(),
  last_name: Joi.string().allow('').optional(),
  scope: Joi.string().required().valid('admin', 'partner', 'user'),
  avatar: Joi.string().optional(),
  email: Joi.string().email().required(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

schema.responseArry = Joi.array().items(schema.response)

module.exports = schema
