const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = Producto;