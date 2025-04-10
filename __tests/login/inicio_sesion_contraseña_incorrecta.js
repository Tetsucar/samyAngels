const request = require('supertest');
const app = require('../../app');

const correo = 'login_exitoso@test.com'; // Este usuario debe existir en la BD


describe('Inicio de sesión con contraseña incorrecta', () => {
  test('Debe rechazar el inicio de sesión con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ correo, contraseña: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.mensaje).toMatch(/contraseña incorrecta/i);
  });
});
