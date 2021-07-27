const router = require('express').Router()
const { dontEnterNotAuthorized } = require('../middlewares/auth-middleware')

router.get('/', dontEnterNotAuthorized, async (req, res) => {
    const users = await req.db.users.findAll()
    const messages = await req.db.messages.findAll({
        include: {
            attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'avatar'],
            model: req.db.users
        },
        raw: true
    })
    res.render('index', {
        title: 'Chat App',
        users,
        user: req.user,
        messages
    })
})

module.exports = {
    router,
    route: '/'
}