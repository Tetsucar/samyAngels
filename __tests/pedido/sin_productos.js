const request = require('supertest');
const app = require('../../app');

describe('Pedido sin productos', () => {
  test('Debe rechazar el pedido si no se envían productos', async () => {
    const res = await request(app)
      .post('/pedido/confirmar')
      .send({
        usuarioId: 1,       
        productos: [],      
        metodoPago: 'nequi'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/usuarioId.*productos/i);

  });
});

