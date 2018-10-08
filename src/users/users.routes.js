const api = require('./users.api.js')
const schema = require('./users.schema')

const Joi = require('joi')

let rotas = [
  {
    path: '/v1/users',
    method: 'GET',
    handler: api.list,
    options: {
      auth: { strategy: 'jwt', scope: 'admin' },
      description: 'Lista de usuários',
      notes: 'Acesso a lista de usuários',
      tags: ['api', 'users'],
      validate: {
        query: schema.list
      },
      response: {
        schema: schema.responseArry
      }
    }
  },
  {
    path: '/v1/users',
    method: 'POST',
    handler: api.create,
    options: {
      auth: { strategy: 'jwt', scope: 'admin' },
      description: 'Cadastro de Novo usuarios',
      notes: 'Acesso para cadastro de novos usuários no sistema',
      tags: ['api', 'users'],
      validate: {
        payload: schema.create
      },
      response: {
        schema: schema.response
      }
    }
  },
  {
    path: '/v1/users/{userId}',
    method: 'GET',
    handler: api.show,
    options: {
      auth: { strategy: 'jwt', scope: 'admin' },
      description: 'Busca usuario',
      notes: 'Localiza usuário pelo Id',
      tags: ['api', 'users'],
      validate: {
        params: {
          userId: Joi.string().required()
        }
      },
      response: {
        schema: schema.response
      }
    }
  },
  {
    path: '/v1/users/{userId}',
    method: 'PUT',
    handler: api.update,
    options: {
      auth: { strategy: 'jwt', scope: 'admin' },
      description: 'Atualiza usuário',
      notes: 'Atualiza dados do usuário pelo Id',
      tags: ['api', 'users'],
      validate: {
        params: {
          userId: Joi.string().required()
        },
        payload: schema.update
      }
    }
  },
  {
    path: '/v1/users/{userId}',
    method: 'DELETE',
    handler: api.delete,
    options: {
      auth: { strategy: 'jwt', scope: 'admin' },
      description: 'Atualiza usuário',
      notes: 'Atualiza dados do usuário pelo Id',
      tags: ['api', 'users'],
      validate: {
        params: {
          userId: Joi.string().required()
        }
      }
    }
  }
]
module.exports = rotas
