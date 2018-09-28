'use strict'

'use strict'
const Joi = require('joi')

const api = require('./auth.api')
const schema = require('./auth.schema')

let rotas = [
    {
    path: '/v1/login',
    method: 'POST',
    handler: api.login,
    options: {
      // auth: { strategy: 'jwt', scope: ['admin', 'partner'] },
      description: 'Login acesso',
      notes: 'URL para que o usuario logar no sistema retornando TOKEN',
      tags: ['api', 'auth'],
      validate: {
        payload: schema.login
      },
      response: {
        schema: schema.response
      }
    }
  }
  
]

module.exports = rotas