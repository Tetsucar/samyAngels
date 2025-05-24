//Registro de pedido exitoso
const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Registro de pedido exitoso', () => {
  test('Debe registrar correctamente un pedido con productos válidos y método válido', async () => {
  const usuarioId = 1; // ← Asegúrate que exista este usuario

  const productosBD = await Producto.findAll({ limit: 3 });

  const productos = productosBD.map((p, i) => ({
    id: p.id,
    cantidad: i + 1
  }));

  const res = await request(app)
    .post('/pedido/confirmar')
    .send({ usuarioId, productos, metodoPago: 'nequi' });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('pedidoId');
  expect(res.body.metodoPago).toBe('nequi');
  expect(Array.isArray(res.body.productos)).toBe(true);
  expect(res.body).toHaveProperty('total');

  // Mostrar resumen del pedido
  console.log('\n RESUMEN DEL PEDIDO:');
  res.body.productos.forEach(p => {
    console.log(`- Producto ID: ${p.id}, Cantidad: ${p.cantidad}`);
  });
  console.log(`Método de pago: ${res.body.metodoPago}`);
  console.log(`Total: ${res.body.total}`);
  });
});
