const express = require('express');
const router = express.Router();
const { elegirMetodoPago } = require('../controllers/pagoController');

router.post('/metodo', elegirMetodoPago);

module.exports = router;
