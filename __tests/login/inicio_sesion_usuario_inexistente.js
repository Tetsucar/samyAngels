const request = require('supertest');
const app = require('../../app');

describe('Inicio de sesión con usuario inexistente', () => {
  const correoInexistente = 'noexiste@test.com';
  const contraseña = '1234';

  test('Debe rechazar el inicio de sesión si el usuario no existe', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ correo: correoInexistente, contraseña });

    expect(res.statusCode).toBe(404);
    expect(res.body.mensaje).toMatch(/usuario no encontrado/i);
  });
});
