const express = require('express');
const router = express.Router();
const { calcularTotal } = require('../controllers/carritoController');


router.post('/calcular-total', calcularTotal);

module.exports = router;
