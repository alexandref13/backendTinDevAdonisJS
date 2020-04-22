'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dislike extends Model {
       /**
     * Hide the password from return
     */
    static get hidden () {
        return ['dev_id','id', 'created_at', 'updated_at']
    }
    
    users(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Dislike
