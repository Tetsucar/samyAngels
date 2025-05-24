const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('🛠️ HU 012 - Reemplazar producto completo por ID', () => {
  test('Debería actualizar nombre, categoría, precio y stock de un producto con ID específico', async () => {
    const idProducto = 4; // ← Cambia este ID según tu base de datos

    const producto = await Producto.findByPk(idProducto);
    expect(producto).toBeDefined();

    const nuevoProducto = {
      nombre: 'Corrector HD',
      categoria: 'maquillaje',
      precio: 30000,
      stock: 10
    };

    const res = await request(app)
      .put(`/productos/${idProducto}`)
      .send(nuevoProducto);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      id: idProducto,
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      precio: nuevoProducto.precio,
      stock: expect.any(Number)
    });

    const actualizado = await Producto.findByPk(idProducto);
    expect(actualizado.nombre).toBe(nuevoProducto.nombre);
    expect(actualizado.categoria).toBe(nuevoProducto.categoria);
    expect(parseFloat(actualizado.precio)).toBeCloseTo(nuevoProducto.precio);
    expect(actualizado.stock).toBe(nuevoProducto.stock);
  });

  test('Debería responder con 404 si el producto no existe', async () => {
    const idInexistente = 99999; // ID que no existe en la base de datos

    const res = await request(app)
      .put(`/productos/${idInexistente}`)
      .send({ nombre: 'Fake', categoria: 'ninguna', precio: 1 });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/no encontrado/i);
  });

  test('Debería actualizar solo el stock de un producto existente', async () => {
    const idProducto = 5;
    const nuevoStock = 10;

    const producto = await Producto.findByPk(idProducto);
    expect(producto).toBeDefined();

    const res = await request(app)
      .patch(`/productos/${idProducto}/stock`)
      .send({ stock: nuevoStock });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', idProducto);
    expect(res.body).toHaveProperty('stock', nuevoStock);

    const actualizado = await Producto.findByPk(idProducto);
    expect(actualizado.stock).toBe(nuevoStock);
  });
});
