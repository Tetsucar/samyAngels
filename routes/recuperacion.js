const express = require('express');
const router = express.Router();
const {solicitarRecuperacion,cambiarContraseña} = require('../controllers/recuperacionController');

router.post('/solicitar', solicitarRecuperacion);
router.post('/cambiar', cambiarContraseña);

module.exports = router;

