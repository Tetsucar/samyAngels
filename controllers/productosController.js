const Producto = require('../models/producto');

// 👉 Listar todos los productos
const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
};

// 👉 Actualizar solo el precio
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

// 👉 Reemplazar todo el producto (nombre, categoría y precio)
const reemplazarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (nombre) producto.nombre = nombre;
    if (categoria) producto.categoria = categoria;
    if (precio !== undefined) producto.precio = precio;

    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al reemplazar el producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  listarProductos,
  actualizarPrecio,
  reemplazarProducto 
};


