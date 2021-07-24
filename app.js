const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./modules/postgres')
const { user } = require('./middlewares/auth-middleware')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(async (req, res, next) => {
    req.db = await db()
    next()
})

app.use(user)

fs.readdir(path.join(__dirname, 'routes'), (err, files) => {
    files.forEach(file => {
        const router = require(path.join(__dirname, 'routes', file))
        app.use(router.route, router.router)
    })
})

module.exports = app