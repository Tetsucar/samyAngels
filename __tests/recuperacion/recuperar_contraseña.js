const request = require('supertest');
const app = require('../../app');
const { __getToken } = require('../../controllers/recuperacionController');

describe('Recuperación de contraseña (usuarios reales)', () => {
  const correo = 'cliente@test.com'; // ← Usa un correo que YA exista en tu base
  const nuevaClave = 'nueva123';

  test('Solicitar recuperación con correo válido', async () => {
    const res = await request(app).post('/recuperacion/solicitar').send({ correo });
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/código de recuperación/i);
  });

  test('Cambiar contraseña con token correcto', async () => {
    const token = __getToken(correo); // ← Se obtiene del controlador

    const res = await request(app).post('/recuperacion/cambiar').send({
      correo,
      token,
      nuevaContraseña: nuevaClave
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/contraseña actualizada/i);
  });

  test('Cambiar contraseña con token inválido', async () => {
    const res = await request(app).post('/recuperacion/cambiar').send({
      correo,
      token: '0000',
      nuevaContraseña: 'nueva-clave-x'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.mensaje).toMatch(/token inválido/i);
  });
});
