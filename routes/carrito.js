const express = require('express');
const router = express.Router();
const { calcularTotal } = require('../controllers/carritoController');
/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCarrito:
 *       type: object
 *       required:
 *         - id
 *         - cantidad
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad de ese producto
 *       example:
 *         id: 1
 *         cantidad: 2
 * 
 *     RespuestaTotal:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *           description: Total calculado del carrito
 *       example:
 *         total: 199.98
 */

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Rutas relacionadas con el cálculo del carrito
 */

/**
 * @swagger
 * /carrito/calcular-total:
 *   post:
 *     summary: Calcula el total de un carrito de compras
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productos:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ItemCarrito'
 *     responses:
 *       200:
 *         description: Total calculado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTotal'
 *       400:
 *         description: Error de validación o datos incorrectos
 *       500:
 *         description: Error interno del servidor
 */

router.post('/calcular-total', calcularTotal);

module.exports = router;
