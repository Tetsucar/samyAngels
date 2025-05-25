const express = require('express');
const router = express.Router();
const {registrarUsuario, iniciarSesion} = require('../controllers/usuariosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroUsuario:
 *       type: object
 *       required:
 *         - nombre
 *         - correo
 *         - contraseña
 *       properties:
 *         nombre:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *         contraseña:
 *           type: string
 *       example:
 *         nombre: Ana Pérez
 *         correo: ana@example.com
 *         contraseña: MiClaveSegura123

 *     LoginUsuario:
 *       type: object
 *       required:
 *         - correo
 *         - contraseña
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *         contraseña:
 *           type: string
 *       example:
 *         correo: ana@example.com
 *         contraseña: MiClaveSegura123

 *     RespuestaAutenticacion:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         token:
 *           type: string
 *       example:
 *         mensaje: Usuario autenticado
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Registro y autenticación de usuarios
 */

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroUsuario'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario existente
 */
router.post('/registro', registrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaAutenticacion'
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', iniciarSesion);

module.exports = router;

