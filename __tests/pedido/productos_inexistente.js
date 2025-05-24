const request = require('supertest');
const app = require('../../app');

describe('Producto inexistente en pedido', () => {
  test('Debe rechazar si algún producto no existe', async () => {
    const res = await request(app)
      .post('/pedido/confirmar')
      .send({
        usuarioId: 1,  // <-- Agregado
        productos: [
          { id: 1, cantidad: 1 },
          { id: 99999, cantidad: 2 }
        ],
        metodoPago: 'efectivo'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/no existen/i);
  });
});
