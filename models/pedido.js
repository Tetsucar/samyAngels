const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente' // pendiente, pagado, anulado
  },
  montoPagado: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'Pedidos',
  timestamps: true
});

module.exports = Pedido;
