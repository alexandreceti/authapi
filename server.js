'use strict'

const Hapi = require('hapi')
const ServerConf = require('./src/config/server')

const server = Hapi.server(ServerConf[process.env.NODE_ENV || 'development'])

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