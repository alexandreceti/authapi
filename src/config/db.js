'use strict'
let knexfile = require('../../knexfile')
let knex = require('knex')(knexfile)
let bookshelf = require('bookshelf')(knex)
let bookshelfUuid = require('bookshelf-uuid')
let bookshelfBcrypt = require('bookshelf-bcrypt')

bookshelf.plugin(bookshelfUuid)
bookshelf.plugin(bookshelfBcrypt)
bookshelf.plugin('registry')
bookshelf.plugin('visibility')
bookshelf.plugin('pagination')

module.exports = bookshelf
