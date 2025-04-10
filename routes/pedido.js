const express = require('express');
const router = express.Router();
const { registrarPedido } = require('../controllers/pedidoController');

router.post('/confirmar', registrarPedido);

module.exports = router;
