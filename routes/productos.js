const express = require('express');
const router = express.Router();
const { listarProductos, actualizarPrecio, reemplazarProducto, actualizarStock } = require('../controllers/productosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         categoria:
 *           type: string
 *         precio:
 *           type: number
 *         stock:
 *           type: integer
 *       example:
 *         id: 1
 *         nombre: Producto A
 *         categoria: Bebidas
 *         precio: 19.99
 *         stock: 50

 *     ProductoActualizado:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         categoria:
 *           type: string
 *         precio:
 *           type: number
 *       example:
 *         nombre: Producto B
 *         categoria: Snacks
 *         precio: 14.50

 *     PrecioActualizado:
 *       type: object
 *       properties:
 *         precio:
 *           type: number
 *       example:
 *         precio: 25.00

 *     StockActualizado:
 *       type: object
 *       properties:
 *         stock:
 *           type: integer
 *       example:
 *         stock: 80
 */

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos y su información
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */

// Ruta para obtener todos los productos
router.get('/', listarProductos);

/**
 * @swagger
 * /productos/{id}/precio:
 *   patch:
 *     summary: Actualiza solo el precio de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrecioActualizado'
 *     responses:
 *       200:
 *         description: Precio actualizado
 *       404:
 *         description: Producto no encontrado
 */

// Ruta para actualizar solo el precio
router.patch('/:id/precio', actualizarPrecio);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Reemplaza todos los datos de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoActualizado'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */

// Ruta para actualizar nombre, categoría y precio
router.put('/:id', reemplazarProducto);

/**
 * @swagger
 * /productos/{id}/stock:
 *   patch:
 *     summary: Actualiza el stock de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StockActualizado'
 *     responses:
 *       200:
 *         description: Stock actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */

// Ruta para actualizar el Stock de un producto
router.patch('/:id/stock', actualizarStock);

module.exports = router;

