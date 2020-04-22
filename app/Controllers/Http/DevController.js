'use strict'

const axios = require('axios')
const crypto = require('crypto')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with devs
 */
class DevController {
  /**
   * Show a list of all devs.
   * GET devs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { user } = request.headers()

    const loggedDev = await Dev.findByOrFail('id', user)

    await loggedDev.load('likes')
    await loggedDev.load('dislikes')

    const loggedDevJSON = loggedDev.toJSON()

    const loggedDevLikes = loggedDevJSON.likes 
    const loggedDevDislikes = loggedDevJSON.dislikes 

    const loggedDevTargetLikes = loggedDevLikes.map(item => item.target)
    const loggedDevTargetDislikes = loggedDevDislikes.map(item => item.target)
    
    const devs = await Dev
     .query()
     .with('likes')
     .with('dislikes')
     .where('id', '<>', loggedDev.id)
     .whereNotIn('id', loggedDevTargetLikes)
     .whereNotIn('id', loggedDevTargetDislikes)
    .fetch()
    
    //  .pluck('id')

     return devs
  }

  /**
   * Create/save a new dev.
   * POST devs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const { username } = request.all()

    const users = await Dev.findBy('user', username)

    if(users){
      return users
    }else{
      const git = await axios.get(`http://api.github.com/users/${username}`)

      const { name, bio, avatar_url: avatar } = git.data

      const id = crypto.randomBytes(4).toString('hex')

      const dev = await Dev.create({
        id,
        user: username,
        name,
        bio,
        avatar
      })

      return dev
    }

  }
}

module.exports = DevController
