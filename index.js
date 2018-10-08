'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
  port: 3000,
  routes: {
    cors: true,
    log: { collect: true }
  }
  // debug: {
  //   request: ['error']
  // }
})

const config = require('./src/config/config')

config(server)
  .then(() => {
    server.start()
    // console.log()
    console.log('Server ' + process.env.NODE_ENV + ' running at:', server.info.uri)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })

module.exports = server
