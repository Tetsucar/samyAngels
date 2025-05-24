const request = require('supertest');
const app = require('../../app');
const { __getToken } = require('../../controllers/recuperacionController');

describe('Recuperación de contraseña (usuarios reales)', () => {
  const correo = 'eduardo@test.com'; // ← Asegúrate de que exista en tu base de datos
  const nuevaClave = 'tetsubebecita';
  let token;

  test('Solicitar recuperación con correo válido', async () => {
    const res = await request(app).post('/recuperacion/solicitar').send({ correo });
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/código de recuperación/i);

    // Obtener el token inmediatamente después de la solicitud
    token = __getToken(correo);
    expect(token).toBeDefined();
  });

  test('Cambiar contraseña con token correcto', async () => {
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
