const Boom = require('boom')
const User = require('../models/user')
const api = {}

api.create = async (request, h, error) => {
  try {
    // console.log(request.payload)
    return await User.forge(request.payload)
      .save()
      .then((user) => {
        // console.log(user)
        return user.toJSON()
      })
      .catch(e => {
        console.log(e)
      })
    // server.log(['acesso', 'info'], request.auth.credentials)
    // return ({result: 'olha... ai..'})
  } catch (err) {
    throw Boom.internal('Internal Mysql Error', err)
  }
}

api.list = async (request, h, error) => {
  /** Lista dos usuarios do sistema.
  * @param {String} name nome do usuario
  */
  console.log('----List----')
  // console.log(request.query)
  const { query, page, pagesize, order } = request.query
  // console.log(query)
  try {
    return User.query((q) => {
      if (query !== '') {
        q.where('name', 'like', '%' + query + '%')
      }
      q.orderBy(order)
    })
      .fetchPage({ pageSize: pagesize, page: page, withRelated: ['albums', 'studies'], debug: true })
      // .fetch()
      .then((users) => {
        return users.toJSON()
      })
      .catch(err => {
        console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
}

api.edit = async (request, h, error) => {
  /** Lista dos usuarios do sistema.
  * @param {String} id ID do usuario para localizalo.
  */
  const userId = request.params.userId
  // console.log(userId)
  try {
    return User.where({ id: userId })
      .fetch()
      .then((user) => {
        return user.toJSON()
      })
  } catch (e) {
    console.log(e)
  }
}

api.update = async (request, h, error) => {

  const userId = request.params.userId
  const userUpdate = request.payload
  // console.log('#Update users')
  // console.log(userId)
  // console.log(userUpdate)
  try {
    return User.where({ id: userId })
      .save(userUpdate, { patch: true })
      .then((user) => {
        // users.set(userUpdate)
        return user.toJSON()
      })
  } catch (e) {
    console.log(e)
    throw Boom.badData(e.message)
  }
}

api.delete = async (request, h, error) => {
  /** Lista dos usuarios do sistema.
  * @param {String} ID ID do usuario para idendificar o usuario a ser alterado.
  */

  const userId = request.params.userId
  // const userUpdate = request.payload
  // console.log('#Update users')
  // console.log(userId)
  // console.log(userUpdate)
  try {
    return User.where({ id: userId })
      .destroy()
      .then((user) => {
        // users.set(userUpdate)
        // console.log(user)
        return user.toJSON()
      })
  } catch (e) {
    console.log(e)
    throw Boom.badData(e.message)
  }
}

module.exports = api
