//Pedido sin productos enviados
const request = require('supertest');
const app = require('../../app');

describe('Pedido sin productos', () => {
  test('Debe rechazar el pedido si no se envían productos', async () => {
    const res = await request(app)
      .post('/pedido/confirmar')
      .send({ metodoPago: 'nequi' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/debe incluir productos/i);
  });
});
