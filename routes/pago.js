const express = require('express');
const router = express.Router();
const { elegirMetodoPago } = require('../controllers/pagoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     MetodoPago:
 *       type: object
 *       required:
 *         - metodo
 *       properties:
 *         metodo:
 *           type: string
 *           description: Método de pago elegido (ej. tarjeta, paypal, efectivo)
 *       example:
 *         metodo: tarjeta

 *     ConfirmacionPago:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *           description: Confirmación del método de pago
 *       example:
 *         mensaje: Método de pago 'tarjeta' seleccionado correctamente
 */

/**
 * @swagger
 * tags:
 *   name: Pago
 *   description: Rutas para gestionar el método de pago
 */

/**
 * @swagger
 * /pago/metodo:
 *   post:
 *     summary: Selecciona el método de pago del usuario
 *     tags: [Pago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MetodoPago'
 *     responses:
 *       200:
 *         description: Confirmación del método de pago
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfirmacionPago'
 *       400:
 *         description: Método de pago inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/metodo', elegirMetodoPago);

module.exports = router;
