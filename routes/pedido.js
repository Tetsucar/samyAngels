const express = require('express');
const router = express.Router();
const { registrarPedido, confirmarPago, obtenerReciboPedido, anularPedido } = require('../controllers/pedidoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductoPedido:
 *       type: object
 *       required:
 *         - id
 *         - cantidad
 *       properties:
 *         id:
 *           type: integer
 *         cantidad:
 *           type: integer
 *       example:
 *         id: 1
 *         cantidad: 3

 *     Pedido:
 *       type: object
 *       required:
 *         - usuarioId
 *         - productos
 *       properties:
 *         usuarioId:
 *           type: integer
 *         productos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductoPedido'
 *         metodoPago:
 *           type: string
 *           enum: [efectivo, nequi, bancolombia]
 *       example:
 *         usuarioId: 1
 *         productos:
 *           - id: 1
 *             cantidad: 2
 *           - id: 3
 *             cantidad: 1
 *         metodoPago: nequi

 *     ConfirmacionPedido:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         mensaje:
 *           type: string
 *         estado:
 *           type: string
 *         total:
 *           type: number
 *         productos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductoPedido'
 *       example:
 *         pedidoId: 123
 *         mensaje: Pedido registrado con éxito
 *         estado: pagado
 *         total: 399.98
 *         productos:
 *           - id: 1
 *             cantidad: 2

 *     ConfirmarPago:
 *       type: object
 *       required:
 *         - pedidoId
 *         - metodoPago
 *       properties:
 *         pedidoId:
 *           type: integer
 *         metodoPago:
 *           type: string
 *           enum: [efectivo, nequi, bancolombia]
 *       example:
 *         pedidoId: 123
 *         metodoPago: nequi

 *     ReciboPedido:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         estado:
 *           type: string
 *         productos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               precioUnitario:
 *                 type: number
 *               subtotal:
 *                 type: number
 *         total:
 *           type: number
 *       example:
 *         pedidoId: 123
 *         estado: pagado
 *         productos:
 *           - nombre: Coca Cola
 *             cantidad: 2
 *             precioUnitario: 2000
 *             subtotal: 4000
 *         total: 4000

 *     CancelacionPedido:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         estado:
 *           type: string
 *       example:
 *         mensaje: Pedido anulado con éxito
 *         estado: anulado
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
 *       400:
 *         description: Datos faltantes o productos inválidos
 */
router.post('/confirmar', registrarPedido);

/**
 * @swagger
 * /pedido/confirmar-pago:
 *   put:
 *     summary: Confirma el pago de un pedido existente
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmarPago'
 *     responses:
 *       200:
 *         description: Pago confirmado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 pedidoId:
 *                   type: integer
 *                 estado:
 *                   type: string
 *                 montoPagado:
 *                   type: number
 *                 metodoPago:
 *                   type: string
 *       400:
 *         description: Datos inválidos o pedido no pendiente
 *       403:
 *         description: Acceso no autorizado
 *       404:
 *         description: Pedido no encontrado
 */
router.put('/confirmar-pago', confirmarPago);

/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Obtiene el recibo de un pedido por ID
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
 *         description: Recibo generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReciboPedido'
 *       403:
 *         description: Acceso no autorizado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', obtenerReciboPedido);

/**
 * @swagger
 * /pedido/anular/{id}:
 *   put:
 *     summary: Anula un pedido existente
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
 *       403:
 *         description: Acceso no autorizado
 *       404:
 *         description: Pedido no encontrado
 *       400:
 *         description: El pedido ya está anulado
 */
router.put('/anular/:id', anularPedido);

module.exports = router;

