const { Sequelize } = require('sequelize');
//                               'database', 'username', 'password'
const sequelize = new Sequelize('samyangels', 'root', 'tetsu1060', {
  host: 'localhost',
  port:'3306',
  dialect: 'mysql'
});

module.exports = sequelize;