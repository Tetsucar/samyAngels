const request = require('supertest');
const app = require('../../app');
const Pedido = require('../../models/pedido');

describe('Confirmar pago de pedido pendiente', () => {
  // Usa un pedido que ya esté en tu base de datos en estado pendiente
  // Cambia este id por uno válido en tu base de datos
  const pedidoIdExistente = 4; 

  test('Debería actualizar el pedido existente a estado pagado', async () => {
    const metodoPago = 'efectivo';

    // Antes de ejecutar el test, aseguramos que el pedido esté pendiente
    const pedido = await Pedido.findByPk(pedidoIdExistente);
    expect(pedido).not.toBeNull();
    expect(pedido.estado).toBe('pendiente');

    const res = await request(app)
      .put('/pedido/confirmar-pago')  // La ruta que usas para confirmar pago
      .send({
        pedidoId: pedidoIdExistente,
        metodoPago
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pedidoId', pedidoIdExistente);
    expect(res.body).toHaveProperty('estado', 'pagado');
    expect(res.body).toHaveProperty('montoPagado');
    expect(res.body.montoPagado).toBeGreaterThan(0);

    // Verifica también en la base que el pedido fue actualizado
    const pedidoActualizado = await Pedido.findByPk(pedidoIdExistente);
    expect(pedidoActualizado.estado).toBe('pagado');
    expect(pedidoActualizado.montoPagado).toBeGreaterThan(0);
  });
});

