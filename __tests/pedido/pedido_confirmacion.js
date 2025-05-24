const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Confirmación del pago (registro de pedido)', () => {
  let productosEnBD;

  beforeAll(async () => {
    productosEnBD = await Producto.findAll({ limit: 2 });
  });

  test('Debería confirmar y registrar un pedido exitosamente', async () => {
    const usuarioId = 1; // ← Asegúrate que exista este usuario

    const productos = productosEnBD.map((p, i) => ({
      id: p.id,
      cantidad: i + 1
    }));

    const metodoPago = 'efectivo';

    const res = await request(app)
      .post('/pedido/confirmar')
      .send({
        usuarioId,
        productos,
        metodoPago
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('pedidoId');
    expect(res.body.total).toBeGreaterThan(0);
    expect(res.body.metodoPago).toBe(metodoPago);
    expect(Array.isArray(res.body.productos)).toBe(true);

    console.log('🧾 Pedido registrado:', res.body);
  });

  test('No debería confirmar si el método de pago es inválido', async () => {
    const res = await request(app).post('/pedido/confirmar').send({
      usuarioId: 1,
      productos: [{ id: productosEnBD[0].id, cantidad: 1 }],
      metodoPago: 'paypal'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/método de pago inválido/i);
  });

  test('No debería confirmar si no se envían productos', async () => {
    const res = await request(app).post('/pedido/confirmar').send({
      usuarioId: 1,
      productos: [],
      metodoPago: 'efectivo'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/productos/i);
  });
});
