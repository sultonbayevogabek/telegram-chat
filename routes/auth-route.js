const router = require('express').Router()
const { dontEnterAuthorized } = require('../middlewares/auth-middleware')

router.get('/', dontEnterAuthorized, (req, res) => {
    res.render('auth', {
        title: 'Authorization'
    })
})

module.exports = {
    router,
    route: '/auth'
}