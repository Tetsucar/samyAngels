const Usuario = require('../models/usuario');

const tokensRecuperacion = new Map(); // simulación en memoria

// Solicitar recuperación
const solicitarRecuperacion = async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ mensaje: 'El correo es obligatorio' });
  }

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Correo no registrado.' });
  }

  // Generar token de 4 dígitos
  const token = Math.floor(1000 + Math.random() * 9000).toString();
  tokensRecuperacion.set(correo, token);

  console.log(`Código de recuperación ${correo}: ${token}`);
  res.status(200).json({ mensaje: 'Código de recuperación enviado.' });
};

// Cambiar contraseña con token
const cambiarContraseña = async (req, res) => {
  const { correo, token, nuevaContraseña } = req.body;

  if (!correo || !token || !nuevaContraseña) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos.' });
  }

  const codigoValido = tokensRecuperacion.get(correo);

  if (codigoValido !== token) {
    return res.status(401).json({ mensaje: 'Token inválido.' });
  }

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
  }

  usuario.contraseña = nuevaContraseña;
  await usuario.save();

  tokensRecuperacion.delete(correo); // Eliminar token una vez usado

  res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
};

// SOLO para test: obtener token generado
function __getToken(correo) {
  return tokensRecuperacion.get(correo);
}

module.exports = {
  solicitarRecuperacion,
  cambiarContraseña,
  __getToken // solo para testing
};
