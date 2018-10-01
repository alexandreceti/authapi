'use strict'
exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.uuid('id').primary()
  table.string('name')
  table.string('last_name')
  table.integer('level')
  table.string('avatar')
  table.string('email').unique().notNullable()
  table.string('password').notNullable()
  table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('users')
