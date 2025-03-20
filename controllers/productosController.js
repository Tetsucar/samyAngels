const Producto = require('../models/producto');

exports.actualizarPrecio = async (req, res) => {
  const { precio } = req.body;
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.precio = precio;
    await producto.save();

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
