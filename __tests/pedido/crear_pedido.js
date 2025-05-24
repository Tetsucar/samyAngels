const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Crear pedido en estado pendiente', () => {
  let productosEnBD;

  beforeAll(async () => {
    productosEnBD = await Producto.findAll({ limit: 2 });
  });

  test('Debería crear un pedido con estado pendiente', async () => {
    const usuarioId = 1;

    const productos = productosEnBD.map((p, i) => ({
      id: p.id,
      cantidad: i + 1
    }));

    const res = await request(app)
      .post('/pedido/confirmar') // usa tu única ruta
      .send({
        usuarioId,
        productos
        // sin metodoPago ⇒ debe quedar como "pendiente"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('pedidoId');
    expect(res.body).toHaveProperty('estado', 'pendiente');
    expect(res.body.total).toBeGreaterThan(0);
    expect(Array.isArray(res.body.productos)).toBe(true);

    console.log('Pedido pendiente registrado:', res.body);
  });
});

