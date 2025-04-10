const express = require('express');
const router = express.Router();
const { listarProductos, actualizarPrecio, reemplazarProducto } = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', listarProductos);

// Ruta para actualizar solo el precio
router.patch('/:id/precio', actualizarPrecio);

// Ruta para actualizar nombre, categoría y precio
router.put('/:id', reemplazarProducto);

module.exports = router;

