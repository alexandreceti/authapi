// require('dotenv').config()
const HapiNowAuth = require('@now-ims/hapi-now-auth')
const plugin = {
  name: 'seguranca',
  version: '1.0.0',
  register: async function (server, options) {
    await server.register(HapiNowAuth)

    server.auth.strategy('jwt', 'hapi-now-auth', {
      verifyJWT: true,
      allowQueryToken: true,
      allowMultipleHeaders: true,

      keychain: ['chavesecreta'],
      validate: async (request, token, h) => {
        console.log('------ token -------')
        console.log(token)
        console.log('---- request ----')
        console.log(request)
        return {
          isValid: typeof token === 'object',
          credentials: token.decodedJWT,
          artifacts: {
            jwt: token.token
          }
        }
      }
    })
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
