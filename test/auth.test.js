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

const Schema = require('../src/auth/auth.schema')
const requestHelper = require('./helpers/request.helper')

const testUser = {
  name: 'Joao',
  last_name: 'Rodrigues',
  email: 'Joao@myfoto.com',
  password: '123456',
  level: '1',
  avatar: '/foto/avatar.jpg'
}

describe('Testes Auth /v1/auth', () => {

  let requestToken = {}
  before(async () => {
    requestToken = await requestHelper(Server)
    return requestToken
  })

  describe('Teste de login', async () => {
    const userValid = { email: 'alexandre@example.com', password: '123456' }
    const userInvalid = { email: 'alexandre@vida.com', password: '123456' }
    const userInvalidPassword = { email: 'alexandre@example.com', password: 'invalida' }

    it('POST /v1/auth - Login usuario valido usuario', async () => {
      const request = {
        method: 'POST',
        url: '/v1/auth',
        payload: userValid
      }
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(200)
      const validLogin = await Joi.validate(response.result, Schema.response).then(() => true)
      expect(validLogin).to.be.true()
    })

    it('POST /v1/auth - Login com usuario invalido', async () => {
      const request = {
        method: 'POST',
        url: '/v1/auth',
        payload: userInvalid
      }
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(401)
      expect(response.result.error).to.equal('Unauthorized')
    })

    it('POST /v1/auth - Login com senha invalida', async () => {
      const request = {
        method: 'POST',
        url: '/v1/auth',
        payload: userInvalidPassword
      }
      const response = await Server.inject(request)
      expect(response.statusCode).to.equal(401)
    })
  })



  describe('Teste de acesso invalidos sem token jwt ', async () => {
    it('GET /v1/auth - Verificar acesso invalido sem Token', async () => {
      const request = {
        method: 'GET',
        url: '/v1/auth'
      }
      const response = await Server.inject(request)

      expect(response.statusCode).to.equal(401)
    })
    it('GET /v1/auth/info - Verificar acesso invalido sem Token', async () => {
      const request = {
        method: 'GET',
        url: '/v1/auth/info'
      }
      const response = await Server.inject(request)


      expect(response.statusCode).to.equal(401)
    })
  })

  describe('Teste de acesso validos com token jwt ', async () => {
    it('GET /v1/auth - Verificar acesso valido com Token', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'GET',
        url: '/v1/auth'
      })

      const response = await Server.inject(request)

      expect(response.statusCode).to.equal(200)
    })
    it('GET /v1/auth/info - Verificar acesso valido com Token', async () => {
      const request = Object.assign({}, requestToken, {
        method: 'GET',
        url: '/v1/auth/info'
      })
      const response = await Server.inject(request)
      // console.log(response.ttl(msec))
      expect(response.statusCode).to.equal(200)
      const validLogin = await Joi.validate(response.result, Schema.responseInfo).then(() => true)
      expect(validLogin).to.be.true()
    })
  })
})
