const Jwt = require('jsonwebtoken')
const { SECRET_WORD } = require('../config')

const generateToken = data => Jwt.sign(data, SECRET_WORD),
   verifyToken = data => {
      try {
         return Jwt.verify(data, SECRET_WORD)
      } catch (e) {
         return false
      }
   }

module.exports = { generateToken, verifyToken }