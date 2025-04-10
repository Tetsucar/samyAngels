// Método de pago válido
const request = require('supertest');
const app = require('../../app');

describe('Método de pago válido', () => {
  test('Debe aceptar "nequi" como método de pago válido', async () => {
    const res = await request(app)
      .post('/pago/metodo')
      .send({ metodo: 'nequi' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('metodo', 'nequi');
    expect(res.body.mensaje).toMatch(/seleccionado correctamente/i);
  });
});

// Método de pago inválido
describe('Método de pago inválido', () => {
  test('Debe rechazar "tarjeta" como método no permitido', async () => {
    const res = await request(app)
      .post('/pago/metodo')
      .send({ metodo: 'tarjeta' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/inválido/i);
  });
});

// Método de pago no enviado
describe('Método de pago no enviado', () => {
  test('Debe dar error si no se envía ningún método de pago', async () => {
    const res = await request(app)
      .post('/pago/metodo')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body.mensaje).toMatch(/debe seleccionar/i);
  });
});
