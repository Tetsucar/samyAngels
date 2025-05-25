const express = require('express');
const router = express.Router();
const { registrarPedido, confirmarPago, obtenerReciboPedido, anularPedido } = require('../controllers/pedidoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductoPedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cantidad:
 *           type: integer
 *       required:
 *         - id
 *         - cantidad
 *       example:
 *         id: 1
 *         cantidad: 3

 *     Pedido:
 *       type: object
 *       properties:
 *         usuarioId:
 *           type: integer
 *         productos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductoPedido'
 *         metodoPago:
 *           type: string
 *       required:
 *         - usuarioId
 *         - productos
 *         - metodoPago
 *       example:
 *         usuarioId: 5
 *         productos:
 *           - id: 1
 *             cantidad: 2
 *           - id: 3
 *             cantidad: 1
 *         metodoPago: tarjeta

 *     ConfirmacionPedido:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         mensaje:
 *           type: string
 *       example:
 *         pedidoId: 123
 *         mensaje: Pedido registrado correctamente

 *     EstadoPago:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         pagado:
 *           type: boolean
 *       example:
 *         pedidoId: 123
 *         pagado: true

 *     ReciboPedido:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         productos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductoPedido'
 *         total:
 *           type: number
 *       example:
 *         pedidoId: 123
 *         productos:
 *           - id: 1
 *             cantidad: 2
 *         total: 199.99

 *     CancelacionPedido:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *       example:
 *         mensaje: Pedido anulado correctamente
 */

/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: Gestión de pedidos y su estado
 */

/**
 * @swagger
 * /pedido/confirmar:
 *   post:
 *     summary: Registra un nuevo pedido
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfirmacionPedido'
 */
router.post('/confirmar', registrarPedido);

/**
 * @swagger
 * /pedido/confirmar-pago:
 *   put:
 *     summary: Confirma el pago de un pedido
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadoPago'
 *     responses:
 *       200:
 *         description: Estado de pago actualizado
 */
router.put('/confirmar-pago', confirmarPago);

/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Obtiene el recibo de un pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Recibo del pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReciboPedido'
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', obtenerReciboPedido);

/**
 * @swagger
 * /pedido/anular/{id}:
 *   put:
 *     summary: Anula un pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido a anular
 *     responses:
 *       200:
 *         description: Pedido anulado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CancelacionPedido'
 *       404:
 *         description: Pedido no encontrado
 */
router.put('/anular/:id', anularPedido);

module.exports = router;

