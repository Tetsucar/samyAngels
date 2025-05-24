const express = require('express');
const router = express.Router();
const { registrarPedido, confirmarPago, obtenerReciboPedido, anularPedido } = require('../controllers/pedidoController');

router.post('/confirmar', registrarPedido); 
router.put('/confirmar-pago', confirmarPago);
router.get('/:id', obtenerReciboPedido);
router.put('/anular/:id', anularPedido);

module.exports = router;

