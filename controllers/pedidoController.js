const Producto = require('../models/producto');

const metodosValidos = ['efectivo', 'nequi', 'bancolombia'];

exports.registrarPedido = async (req, res) => {
  const { productos, metodoPago } = req.body;

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'Debe incluir productos con id y cantidad' });
  }

  if (!metodoPago || !metodosValidos.includes(metodoPago.toLowerCase())) {
    return res.status(400).json({ mensaje: 'Método de pago inválido o no proporcionado' });
  }

  try {
    // Buscar todos los productos por sus IDs
    const ids = productos.map(p => p.id);
    const productosBD = await Producto.findAll({ where: { id: ids } });

    if (productosBD.length !== productos.length) {
      return res.status(400).json({ mensaje: 'Algunos productos no existen en la base de datos' });
    }

    // Calcular total
    let total = 0;
    productos.forEach(p => {
      const productoBD = productosBD.find(prod => prod.id === p.id);
      total += parseFloat(productoBD.precio) * p.cantidad;
    });

    // Simular guardar pedido
    const pedido = {
      productos,
      metodoPago,
      total
    };

    res.status(201).json({
      mensaje: 'Pedido registrado con éxito',
      pedido
    });
  } catch (error) {
    console.error('Error al registrar pedido:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
