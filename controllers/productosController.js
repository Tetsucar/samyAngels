const Producto = require('../models/producto');

// 👉 Controlador para listar todos los productos
const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
};

// 👉 Controlador para actualizar el precio de un producto
const actualizarPrecio = async (req, res) => {
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

module.exports = {
  listarProductos,
  actualizarPrecio
};

