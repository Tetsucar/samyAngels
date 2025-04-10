const Producto = require('../models/producto');

const calcularTotal = async (req, res) => {
  try {
    const { productos } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: 'No se enviaron productos válidos.' });
    }

    let total = 0;

    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);
      if (!producto) continue;

      const precio = parseFloat(producto.precio);
      total += precio * item.cantidad;
    }

    res.status(200).json({ total });
  } catch (error) {
    console.error('Error al calcular el total:', error);
    res.status(500).json({ mensaje: 'Error al calcular el total' });
  }
};

module.exports = {
  calcularTotal
};
