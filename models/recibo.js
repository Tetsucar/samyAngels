const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recibo = sequelize.define('Recibo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaEmision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Recibos',
  timestamps: true
});

module.exports = Recibo;
