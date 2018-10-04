'use strict'
// require('dotenv').config()
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('../../package')

const swaggerOptions = {
  basePath: '/v1',
  // pathReplacements: ['livros', 'autores'],
  info: {
    title: 'Documentação Livros API',
    version: Pack.version,
    contact: {
      name: 'alexandre',
      email: 'alexandrecunha.eti@gmail.com'
    }
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  expanded: 'list',
  documentationPath: '/docs',
  grouping: 'tags',
  sortEndpoints: 'path',
  jsonEditor: true,
  // sortTags: 'tags',
  tags: [
    {
      name: 'auth',
      description: 'recurso de authenticação'
    },
    {
      name: 'users',
      description: 'Recurso de usuarios.'
    }
  ]
}

module.exports = async function register (server) {
  try {
    return await server.register([{
      plugin: require('inert')
    },
    { plugin: require('./jwt2') },
    {
      plugin: require('hapi-router'),
      options: {
        routes: 'src/**/*.routes.js'
      }
    },
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
    ])
  } catch (err) {
    // Handle err
    console.log(err)
    // process.exit(1)
    throw err
  }
}
