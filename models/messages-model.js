module.exports = (Sequelize, sequelize) => {
   return sequelize.define('messages', {
      messageId: {
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.DataTypes.UUIDV4,
         primaryKey: true
      },
      messageText: {
         type: Sequelize.DataTypes.STRING(1000),
         allowNull: false
      }
   })
}