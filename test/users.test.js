'use strict'
// requires for testing
const Code = require('code')
const Lab = require('lab')
// const lab = exports.lab = Lab.script()
const Joi = require('joi')
// use some BDD verbage instead of lab default
const { describe, it, before } = exports.lab = Lab.script()
const expect = Code.expect
// require hapi server
const Server = require('../index.js')

const Schema = require('../src/users/users.schema')
const requestHelper = require('./helpers/request.helper')

const testUser = {
  name: 'Joao',
  last_name: 'Rodrigues',
  email: 'joao@example.com',
  password: '123456',
  scope: 'admin',
  avatar: '/foto/avatar.jpg'
}

describe('Testes Auth /v1/auth', () => {
  let userTemp = {}
  let requestToken = {}
  before(async () => {
    requestToken = await requestHelper(Server)
    return requestToken
  })


  describe('Teste de login', async () => {
    it('GET /v1/users - Lista de usúarios cadastrados', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'GET',
        url: '/v1/users'
      })
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(200)

      const validLogin = await Joi.validate(response.result, Schema.responseArry).then(() => true)
      expect(validLogin).to.be.true()
    })

    it('POST /v1/users - Cria novo usúarios', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'POST',
        url: '/v1/users',
        payload: testUser
      })
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(200)

      const validLogin = await Joi.validate(response.result, Schema.response).then(() => true)
      expect(validLogin).to.be.true()
      userTemp = response.result
      // console.log(userTemp.id)
    })

    it('GET /v1/users/userId - Busca usúario especifico', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'GET',
        url: '/v1/users/' + userTemp.id
      })
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(200)

      const validLogin = await Joi.validate(response.result, Schema.response).then(() => true)
      expect(validLogin).to.be.true()
    })

    // it('PUT /v1/users/userId - Atualiza usúario especifico', async () => {
    //   const request = Object.assign({}, requestToken, {
    //     method: 'PUT',
    //     url: '/v1/users/' + userTemp.id,
    //     payload: {
    //       name: 'testeup',
    //       last_name: 'RodriguesUP',
    //       email: 'joao@example.com',
    //       scope: 'admin',
    //       avatar: '/foto/avatarup.jpg'
    //     }
    //   })
    //   const response = await Server.inject(request)
    //   expect(response.statusCode).to.equal(200)
    //   console.log(response.result)
    //   const validLogin = await Joi.validate(response.result, Schema.response).then(() => true)
    //   expect(validLogin).to.be.true()
    // })

    it('DELETE /v1/users/userId - Remove usúario cadastrado', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'DELETE',
        url: '/v1/users/' + userTemp.id
      })
      const response = await Server.inject(request)
      // console.log(response.result)
      expect(response.statusCode).to.equal(200)
    })

  })
})
