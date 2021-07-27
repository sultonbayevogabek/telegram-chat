const router = require('express').Router()
const fileUpload = require('express-fileupload')
const { authGetController, signUpController, signInController } = require('../controllers/auth-controller')

const { dontEnterAuthorized } = require('../middlewares/auth-middleware')

router.get('/', dontEnterAuthorized, authGetController)

router.post('/signup', fileUpload(), signUpController)

router.post('/signin', signInController)

module.exports = {
    router,
    route: '/auth'
}