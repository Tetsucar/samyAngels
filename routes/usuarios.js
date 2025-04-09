const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  iniciarSesion
} = require('../controllers/usuariosController');

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);

module.exports = router;

