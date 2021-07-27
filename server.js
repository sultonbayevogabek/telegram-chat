const config = require('./config')
const { app, server } = require('./app')

server.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`)
})