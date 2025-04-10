// Pedido con método de pago inválido
const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Método de pago inválido', () => {
  test('Debe rechazar un pedido con método de pago no válido', async () => {
    const productosBD = await Producto.findAll({ limit: 1 });

    const productos = productosBD.map(p => ({ id: p.id, cantidad: 1 }));

    const res = await request(app)
      .post('/pedido/confirmar')
      .send({ productos, metodoPago: 'bitcoin' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/inválido/i);
  });
});
