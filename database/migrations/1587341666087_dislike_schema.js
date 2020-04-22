'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DislikeSchema extends Schema {
  up () {
    this.create('dislikes', (table) => {
      table.increments()
      table.string('dev_id').references('id').inTable('devs')
      table.string('target')
      table.timestamps()
    })
  }

  down () {
    this.drop('dislikes')
  }
}

module.exports = DislikeSchema
