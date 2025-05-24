const request = require('supertest');
const app = require('../../app');

describe('Recibo del pedido', () => {
  const idExistente = 1; // Usa un ID real de tu base de datos

  test('Debe mostrar el recibo del pedido correctamente', async () => {
    const res = await request(app).get(`/pedido/${idExistente}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('productos');
    expect(Array.isArray(res.body.productos)).toBe(true);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('estado');
    expect(res.body.mensaje).toMatch(/recibo/i);

    console.log('Recibo:', res.body);
  });

  test('Debe responder con 404 si el pedido no existe', async () => {
    const res = await request(app).get('/pedido/99999'); // un ID que no exista

    expect(res.statusCode).toBe(404);
    expect(res.body.mensaje).toMatch(/pedido no encontrado/i);
  });
});
