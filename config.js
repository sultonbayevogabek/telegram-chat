require('dotenv').config({ path: './config.env' })

module.exports = {
   PORT: process.env.PORT,
   SECRET_WORD: process.env.SECRET_WORD,
   PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING
}
