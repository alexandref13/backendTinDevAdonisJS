'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dev extends Model {

    likes(){
        return this.hasMany('App/Models/Like')
    }
    dislikes(){
        return this.hasMany('App/Models/Dislike')
    }
}

module.exports = Dev
