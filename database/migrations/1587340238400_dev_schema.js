'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DevSchema extends Schema {
  up () {
    this.create('devs', (table) => {
      table.string('id').primary()
      table.string('user').notNullable()
      table.string('name').notNullable()
      table.string('bio')
      table.string('avatar')
      table.timestamps()
    })
  }

  down () {
    this.drop('devs')
  }
}

module.exports = DevSchema
