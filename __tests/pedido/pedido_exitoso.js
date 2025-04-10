//Registro de pedido exitoso
const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Registro de pedido exitoso', () => {
  test('Debe registrar correctamente un pedido con productos válidos y método válido', async () => {
    const productosBD = await Producto.findAll({ limit: 2 });

    const productos = productosBD.map((p, i) => ({
      id: p.id,
      cantidad: i + 1
    }));

    const res = await request(app)
      .post('/pedido/confirmar')
      .send({ productos, metodoPago: 'nequi' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('pedido');
    expect(res.body.pedido.metodoPago).toBe('nequi');
    expect(Array.isArray(res.body.pedido.productos)).toBe(true);
    expect(res.body.pedido).toHaveProperty('total');

    // Mostrar resumen del pedido
    console.log('\n RESUMEN DEL PEDIDO:');
    res.body.pedido.productos.forEach(p => {
      console.log(`- Producto ID: ${p.id}, Cantidad: ${p.cantidad}`);
    });
    console.log(`Método de pago: ${res.body.pedido.metodoPago}`);
    console.log(`Total: ${res.body.pedido.total}`);
  });
});
