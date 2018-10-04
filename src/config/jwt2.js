'use strict'

// bring your own validation function
const validate = async (token, request) => {
  //console.log('------ decoded -------')
  //console.log(token)
  //console.log('---- request ----')
  //console.log(request.auth)

  return {
    isValid: typeof token === 'object',
    credentials: token.decodedJWT
    // artifacts: {
    //   jwt: token.token
    // }
  }
}

const plugin = {
  name: 'seguranca',
  version: '1.0.1',
  register: async function (server, options) {
    await server.register(require('hapi-auth-jwt2'))

    server.auth.strategy('jwt', 'jwt', {
      key: 'chavesecreta',
      validate: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    })

    server.auth.default('jwt')

    server.events.on('log', (event, tags) => {
      if (tags.error) {
        // console.log('JWT aqui..')
        console.log(event)
      }
      if (tags.info) {
        // console.log('JWT aqui..')
        console.log(event)
      }
    })

    // fim do plugin
  }
}
module.exports = plugin
