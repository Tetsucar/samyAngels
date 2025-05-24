const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anulacion = sequelize.define('Anulacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Anulaciones',
  timestamps: true
});

module.exports = Anulacion;
