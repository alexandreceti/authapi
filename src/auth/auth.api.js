'use strict'

const Boom = require('boom')
// const User = require('../models/users')
const api = {}

api.login = async (request, h, error) => {

  // const new_studio = { }request.payload
  console.log('--- New login ----')
  
  try {
    return {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'}
  } catch (err) {
    console.log(err)
    throw Boom.badData(err.message)
  }
}

module.exports = api