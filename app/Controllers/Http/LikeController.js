const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Like = use('App/Models/Like')

class LikeController {
    async store({request, params, response}){
        const { user } = request.headers()
        const { id } = params

        const loggedDev = await Dev.findBy('id', user)
        const targetDev = await Dev.findBy('id', id)
        
        if(!targetDev){
            return response.status(400).json({ error: "Dev not exists" })
        }   

        await targetDev.load('likes')

        const match = await targetDev
         .likes()
         .where('target', loggedDev.id)
         .fetch()

        if(match !== []){
            console.log('Deu match');
        }

        await loggedDev.load('likes')
        await loggedDev
         .likes()
         .create({ target: targetDev.id})
    }
}

module.exports = LikeController
