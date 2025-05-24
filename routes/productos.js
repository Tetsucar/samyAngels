const express = require('express');
const router = express.Router();
const { listarProductos, actualizarPrecio, reemplazarProducto, actualizarStock } = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', listarProductos);

// Ruta para actualizar solo el precio
router.patch('/:id/precio', actualizarPrecio);

// Ruta para actualizar nombre, categoría y precio
router.put('/:id', reemplazarProducto);

// Ruta para actualizar el Stock de un producto
router.patch('/:id/stock', actualizarStock);

module.exports = router;

