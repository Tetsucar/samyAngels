const express = require('express');
const router = express.Router();
const { listarProductos, actualizarPrecio } = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', listarProductos);

// Ruta para actualizar el precio de un producto
router.put('/:id', actualizarPrecio);

module.exports = router;
