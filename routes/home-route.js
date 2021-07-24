const router = require('express').Router()
const { dontEnterNotAuthorized } = require('../middlewares/auth-middleware')

router.get('/', dontEnterNotAuthorized, (req, res) => {
    res.render('index', {
        title: 'Chat App'
    })
})

module.exports = {
    router,
    route: '/'
}