const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Modelos
db.Usuario = require('./usuario');
db.Producto = require('./producto');
db.Pedido = require('./pedido');
db.DetallePedido = require('./detallePedido');
db.Recibo = require('./recibo');
db.Anulacion = require('./anulacion');

// Asociaciones

db.Pedido.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });
db.Usuario.hasMany(db.Pedido, { foreignKey: 'usuarioId' });

db.DetallePedido.belongsTo(db.Pedido, { foreignKey: 'pedidoId' });
db.DetallePedido.belongsTo(db.Producto, { foreignKey: 'productoId' });
db.Pedido.hasMany(db.DetallePedido, { foreignKey: 'pedidoId' });

db.Recibo.belongsTo(db.Pedido, { foreignKey: 'pedidoId' });
db.Pedido.hasOne(db.Recibo, { foreignKey: 'pedidoId' });

db.Anulacion.belongsTo(db.Pedido, { foreignKey: 'pedidoId' });
db.Pedido.hasOne(db.Anulacion, { foreignKey: 'pedidoId' });

// Conexión
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

