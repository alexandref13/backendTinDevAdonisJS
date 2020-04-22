'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

class DislikeController {
    async store({request, params, response}){
        const { user } = request.headers()
        const { id } = params

        const loggedDev = await Dev.findBy('id', user)
        const targetDev = await Dev.findBy('id', id)
        
        if(!targetDev){
            return response.status(400).json({ error: "Dev not exists" })
        }   
        await loggedDev.load('dislikes')
        await loggedDev
         .dislikes()
         .create({ target: targetDev.id})
    }
}

module.exports = DislikeController
