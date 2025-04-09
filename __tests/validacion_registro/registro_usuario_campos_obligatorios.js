const request = require('supertest');
const app = require('../../app');

describe('Registro con campos obligatorios faltantes', () => {
  test('No debería registrar un usuario sin correo', async () => {
    const res = await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Ana',
        contraseña: '1234'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/faltan campos/i);
  });

  test('No debería registrar un usuario sin nombre', async () => {
    const res = await request(app)
      .post('/usuarios/registro')
      .send({
        correo: 'ana@test.com',
        contraseña: '1234'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/faltan campos/i);
  });

  test('No debería registrar un usuario sin contraseña', async () => {
    const res = await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Ana',
        correo: 'ana@test.com'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/faltan campos/i);
  });
});

