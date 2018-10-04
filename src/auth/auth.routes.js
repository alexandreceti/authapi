'use strict'

'use strict'
const Joi = require('joi')

const api = require('./auth.api')
const schema = require('./auth.schema')

let rotas = [
  {
    path: '/v1/auth',
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
    path: '/v1/auth',
    method: 'GET',
    handler: api.isvalid,
    options: {
      auth: { strategy: 'jwt' },
      // auth: true,
      description: 'Usuario valido?',
      notes: 'URL para verificar se o usuario e valido se sim returna true se não returna false',
      tags: ['api', 'auth'],
      validate: {
        headers:
          Joi.object({
            'Authorization': Joi.string().optional().description('Authorization header containing the JSON Web Token')
          }).unknown()
      }
    }
  },//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExMjQ1M2M3LWVjNjItNGQ4OS1hZWYzLTM1MTAyMjlmNWY1MiIsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE1Mzg1MDczMzN9.rLqMKKkGQyERuMmd_G11qa0D8ikBJAnYM-ac1rF2d_w
  {
    path: '/v1/auth/info',
    method: 'GET',
    handler: api.info,
    options: {
      auth: { strategy: 'jwt' },
      description: 'Usuario authenicado',
      notes: 'URL para que buscas dados do usuario logado no sistema.',
      tags: ['api', 'auth']
    }
  }

]

module.exports = rotas
