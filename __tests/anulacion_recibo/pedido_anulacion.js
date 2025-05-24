const request = require('supertest');
const app = require('../../app');
const Pedido = require('../../models/pedido');

describe('🛑 HU 010 - Anulación de pedido existente', () => {
  const idPedidoExistente = 3; //id del pedido

  test('Debería anular un pedido existente', async () => {
    // Verifica que el pedido existe antes de anular
    const pedido = await Pedido.findByPk(idPedidoExistente);
    expect(pedido).toBeDefined();
    expect(pedido.estado).not.toBe('anulado');

    const res = await request(app)
      .put(`/pedido/anular/${idPedidoExistente}`)
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/pedido anulado/i);

    // Verifica en la base de datos que el estado cambió
    const actualizado = await Pedido.findByPk(idPedidoExistente);
    expect(actualizado.estado).toBe('anulado');
  });

  test('🔴 No debería anular un pedido que no existe', async () => {
    const res = await request(app)
      .put('/pedido/anular/99999')
      .send();

    expect(res.statusCode).toBe(404);
    expect(res.body.mensaje).toMatch(/no encontrado/i);
  });
});
