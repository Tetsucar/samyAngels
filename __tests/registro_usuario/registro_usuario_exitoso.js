const request = require('supertest');
const app = require('../../app');

describe('Registro de usuario exitoso', () => {
  test('Debería registrar un nuevo usuario con éxito', async () => {
    const nombre = 'sebastian';
    const correo = 'sebastian@test.com';
    const contraseña= 'sebastian123';
    const res = await request(app)
      .post('/usuarios/registro')
      .send({nombre,correo,contraseña});

    expect(res.statusCode).toBe(201);
    expect(res.body.usuario).toHaveProperty('id');
    expect(res.body.usuario.correo).toBe(correo);
    expect(res.body.usuario.rol).toBe('cliente');
  });
});
