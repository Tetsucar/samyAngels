const request = require('supertest');
const app = require('../../app');

describe('Registro con correo duplicado', () => {
  test('No debería registrar un usuario con el mismo correo', async () => {
    const res = await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Otro',
        correo: 'juan@test.com',
        contraseña: '1234'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/ya está registrado/i);
  });
});
