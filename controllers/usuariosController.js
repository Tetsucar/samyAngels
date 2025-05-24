const Usuario = require('../models/usuario');

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
    try {
      const { nombre, correo, contraseña } = req.body;
  
      //Validación previa antes de usar Sequelize
      if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
      }
  
      const existeUsuario = await Usuario.findOne({ where: { correo } });
      if (existeUsuario) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
      }
  
      const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña });
  
      res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
  };
  

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};
