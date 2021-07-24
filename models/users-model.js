module.exports = (Sequelize, sequelize) => {
   return sequelize.define('users', {
      userId: {
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.DataTypes.UUIDV4,
         primaryKey: true
      },
      firstName: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      lastName: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      email: {
         type: Sequelize.DataTypes.STRING(64),
         is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
         allowNull: false
      },
      password: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      role: {
         type: Sequelize.DataTypes.STRING(10),
         isIn: [['user', 'admin']],
         defaultValue: 'user'
      },
      avatar: {
         type: Sequelize.DataTypes.STRING,
         allowNull: false
      }
   })
}