'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikeSchema extends Schema {
  up () {
    this.create('likes', (table) => {
      table.increments()
      table.string('dev_id').references('id').inTable('devs')
      table.string('target')
      table.timestamps()
    })
  }

  down () {
    this.drop('likes')
  }
}

module.exports = LikeSchema
