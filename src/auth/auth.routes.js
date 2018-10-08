'use strict'
// const Joi = require('joi')
const api = require('./auth.api')
const schema = require('./auth.schema')

let rotas = [
  {
    path: '/v1/auth',
    method: 'POST',
    handler: api.auth,
    options: {
      auth: false,
      description: 'Login acesso',
      notes: 'URL para que o usuario logar no sistema retornando TOKEN',
      tags: ['api', 'auth'],
      validate: {
        payload: schema.login
      },
      response: {
        schema: schema.response
      },
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  },
  {
    path: '/v1/auth',
    method: 'GET',
    handler: api.isvalid,
    options: {
      auth: 'jwt',
      // auth: true,
      description: 'Usuario valido?',
      notes: 'URL para verificar se o usuario e valido se sim returna true se não returna false',
      tags: ['api', 'auth'],
      response: {
        schema: schema.isValid
      }
    }
  },
  {
    path: '/v1/auth/info',
    method: 'GET',
    handler: api.info,
    options: {
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Usuario authenicado',
      notes: 'URL para que buscas dados do usuario logado no sistema.',
      tags: ['api', 'auth'],
      response: {
        schema: schema.responseInfo
      }
    }
  }

]

module.exports = rotas
