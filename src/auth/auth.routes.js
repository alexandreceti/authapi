'use strict'

'use strict'
const Joi = require('joi')

const api = require('./auth.api')
const schema = require('./auth.schema')

let rotas = [
    {
    path: '/v1/login',
    method: 'POST',
    handler: api.auth,
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
  },
  {
    path: '/api/v1/login/info',
    method: 'GET',
    handler: api.info,
    options: {
      auth: {strategy: 'jwt'}
    }
  }
  
]

module.exports = rotas