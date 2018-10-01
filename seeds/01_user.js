'use strict'
const bcrypt = require('bcrypt')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 'a12453c7-ec62-4d89-aef3-3510229f5f52', name: 'Alexandre', last_name: 'Cunha Cruz Oliveira', email: 'alexandre@example.com', password: bcrypt.hashSync('123456', 12), level: '1', avatar: '/profile/avatar.jpg', created_at: new Date(), updated_at: new Date() },
        { id: 'c605f958-dbfc-4144-a43b-10a6be154920', name: 'Henrique', last_name: 'keppel', email: 'keppel@example.com', password: bcrypt.hashSync('123456', 12), level: '1', avatar: '/profile/avatar.jpg', created_at: new Date(), updated_at: new Date() },
        { id: '15857d3b-b02b-46b3-aa74-1a45873ce561', name: 'admin', last_name: 'Supremo', email: 'adm@example.com', password: bcrypt.hashSync('123456', 12), level: '1', avatar: '/profile/avatar.jpg', created_at: new Date(), updated_at: new Date() },
        { id: '76a9a87a-3009-42e9-a86e-b4b9f83efba2', name: 'parceiro', last_name: 'parceiro', email: 'parceiro@example.com', password: bcrypt.hashSync('123456', 12), level: '2', avatar: '/profile/avatar.jpg', created_at: new Date(), updated_at: new Date() },
        { id: 'cde5d8c3-33d9-4485-8d25-f0989762fdaf', name: 'user', last_name: 'users', email: 'user@example.com', password: bcrypt.hashSync('123456', 12), level: '3', avatar: '/profile/avatar.jpg', created_at: new Date(), updated_at: new Date() }
      ])
    })
}
