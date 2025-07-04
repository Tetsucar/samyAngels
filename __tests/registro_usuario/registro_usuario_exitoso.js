const request = require('supertest');
const app = require('../../app');

describe('Registro de usuario exitoso', () => {
  test('Debería registrar un nuevo usuario con éxito', async () => {
    const nombre = 'jessika';
    const correo = 'jessika@test.com';
    const contraseña= 'jessika1061';
    const res = await request(app)
      .post('/usuarios/registro')
      .send({nombre,correo,contraseña});

    expect(res.statusCode).toBe(201);
    expect(res.body.usuario).toHaveProperty('id');
    expect(res.body.usuario.correo).toBe(correo);
    expect(res.body.usuario.rol).toBe('cliente');
  });
});
