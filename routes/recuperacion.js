const express = require('express');
const router = express.Router();
const {solicitarRecuperacion,cambiarContraseña} = require('../controllers/recuperacionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SolicitudRecuperacion:
 *       type: object
 *       required:
 *         - correo
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo del usuario que solicita recuperar la contraseña
 *       example:
 *         correo: usuario@example.com

 *     CambioContraseña:
 *       type: object
 *       required:
 *         - correo
 *         - token
 *         - nuevaContraseña
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *         token:
 *           type: string
 *         nuevaContraseña:
 *           type: string
 *       example:
 *         correo: usuario@example.com
 *         token: abc123
 *         nuevaContraseña: NuevaClave2024
 */

/**
 * @swagger
 * tags:
 *   name: Recuperación
 *   description: Recuperación de contraseña y cambio mediante token
 */

/**
 * @swagger
 * /recuperacion/solicitar:
 *   post:
 *     summary: Solicita un código de recuperación para cambiar la contraseña
 *     tags: [Recuperación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolicitudRecuperacion'
 *     responses:
 *       200:
 *         description: Código de recuperación enviado por correo
 *       400:
 *         description: Correo inválido o no registrado
 */
router.post('/solicitar', solicitarRecuperacion);

/**
 * @swagger
 * /recuperacion/cambiar:
 *   post:
 *     summary: Cambia la contraseña usando un token recibido por correo
 *     tags: [Recuperación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CambioContraseña'
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o expirado
 */
router.post('/cambiar', cambiarContraseña);

module.exports = router;

