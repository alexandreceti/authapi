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
      name: 'livros',
      description: 'recurso de livros'
    },
    {
      name: 'editoras',
      description: 'recurso de editoras'
    },
    {
      name: 'pedidos',
      description: 'recurso de pedidos'
    },
    {
      name: 'Carrinhos',
      description: 'recurso de pedidos'
    }
  ]
}

module.exports = async function register (server) {
  try {
    return await server.register([{
      plugin: require('inert')
    },
    //{ plugin: require('./jwt')},
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
