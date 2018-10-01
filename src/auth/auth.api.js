'use strict'

const Boom = require('boom')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const api = {}

api.auth = async (request, h, error) => {
  try {
    console.log(request.payload)
    let user = {}
    return await User.forge({email: request.payload.email})
      .fetch({ require: true })
      .then((response) => {
        return response.compare(request.payload.password)
          .then((valid) => {
            if (valid) {
              return response.toJSON()
            } else {
              throw new Error('invalid password')
            }
          })
          .catch((err) => {
            console.log(err)
            throw new Error('invalid password')
          })
      })
      .then((response) => {
        // console.log(response)
        user.id = response.id
        if (parseInt(response.level) === 1) {
          user.scope = 'admin'
        } else {
          if (parseInt(response.level) === 2) {
            user.scope = 'partner'
          } else {
            user.scope = 'user'
          }
        }
        console.log(user)
        return user
      })
      .then((userValid) => {
        const token = jwt.sign(userValid, 'chavesecreta')
        return ({token: token})
      })
      .catch(err => {
        // console.log(e)
        return Boom.unauthorized(err.message)
      })
  } catch (err) {
    console.log(err)
    throw Boom.internal('Internal Mysql Error', err)
  }
}

api.info = async (request, h, error) => {
  // TODO: Informações do usuario.
  try {
    // const pool = request.mysql.pool
    console.log(request.auth)
    // const [rows] = await pool.query(querys.cidades, [request.auth.credentials.id])
    let info = {credentials: request.auth.credentials, artifacts: request.auth.artifacts}
    // console.log(rows[0].cidades)
    return ({info})
  } catch (err) {
    console.log(err)
    throw Boom.internal('Internal Mysql Error', err)
  }
}

module.exports = api