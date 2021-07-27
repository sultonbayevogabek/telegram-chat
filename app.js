const path = require('path')
const http = require('http')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./modules/postgres')
const { user } = require('./middlewares/auth-middleware')
const app = express()
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/socket', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(async (req, res, next) => {
   req.db = await db()
   next()
})

app.use(user)

io.on('connection', async socket => {
   socket.broadcast.emit('join', )

   const psql = await db()

   socket.on('new-message', async data => {
      const newMessage = await psql.messages.create({
         messageText: data.message,
         userId: data.userId
      })

      const message = await psql.messages.findOne({
         where: {messageId: newMessage.messageId},
         include: {
            attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'avatar'],
            model: psql.users
         },
         raw: true
      })

      socket.broadcast.emit('new-message', {
         message
      })
   })

   socket.on('left-real', (data) => {
      socket.broadcast.emit('left-real', data)
   })

   socket.on('login', data => {
      socket.broadcast.emit('login', {
         user: data.user
      })
   })
})

fs.readdir(path.join(__dirname, 'routes'), (err, files) => {
   files.forEach(file => {
      const router = require(path.join(__dirname, 'routes', file))
      app.use(router.route, router.router)
   })
})

module.exports = { app, server }