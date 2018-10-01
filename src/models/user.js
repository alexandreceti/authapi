'use strict'

const db = require('../config/db')

module.exports = db.model('User', {
  tableName: 'users',
  uuid: true,
  hasTimestamps: true,
  bcrypt: {
    field: 'password'
  },
  hidden: 'password'
})
