const express = require('express');
const router = express.Router();
const { actualizarPrecio } = require('../controllers/productosController');

router.put('/:id', actualizarPrecio);

module.exports = router;