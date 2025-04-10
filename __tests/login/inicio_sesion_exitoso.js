const request = require('supertest');
const app = require('../../app');

// Se usará un usuario que ya existe en la base de datos
const correo = 'login_exitoso@test.com';
const contraseña = '1234';

describe('Inicio de sesión exitoso', () => {
  test('Debe iniciar sesión correctamente', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ correo, contraseña });

    expect(res.statusCode).toBe(200);
    expect(res.body.usuario.correo).toBe(correo);
    expect(res.body.mensaje).toMatch(/inicio de sesión exitoso/i);
  });
});
