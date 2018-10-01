'use strict'

let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite'
  }
})
let bookshelf = require('bookshelf')(knex)
let bookshelfUuid = require('bookshelf-uuid')
let bookshelfBcrypt = require('bookshelf-bcrypt')

bookshelf.plugin(bookshelfUuid)
bookshelf.plugin(bookshelfBcrypt)
bookshelf.plugin('registry')
bookshelf.plugin('visibility')
bookshelf.plugin('pagination')

module.exports = bookshelf
