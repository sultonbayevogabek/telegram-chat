const { Sequelize } = require('sequelize')
const { PG_CONNECTION_STRING } = require('../config')

const sequelize = new Sequelize(PG_CONNECTION_STRING, {
   logging: false
})

module.exports = async function () {
   try {
      const db = {}

      db.users = await require('../models/users-model')(Sequelize, sequelize)
      db.messages = await require('../models/messages-model')(Sequelize, sequelize)

      await db.users.hasMany(db.messages, {
         foreignKey: {
            name: 'userId',
            allowNull: false
         }
      })

      await db.messages.belongsTo(db.users, {
         foreignKey: {
            name: 'userId',
            allowNull: false
         }
      })

      await sequelize.sync({ force: false })

      return db
   } catch (e) {
      console.log(e + "")
   }
}
