module.exports = {
  development: {
    port: 3000,
    routes: {
      cors: true,
      log: {collect: true}
    },
    debug: {
      request: ['error']
    }
  },
  test: {
    port: 8081,
    routes: {
      cors: true,
      log: {collect: true}
    }
  },
  production: {
    port: 80,
    routes: {
      cors: true,
      log: {collect: true}
    },
    debug: {
      request: ['error']
    }
  }
}
