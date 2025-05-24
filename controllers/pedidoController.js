const Producto = require('../models/producto');
const { Pedido, DetallePedido } = require('../models');


const metodosValidos = ['efectivo', 'nequi', 'bancolombia'];

exports.registrarPedido = async (req, res) => {
  const { usuarioId, productos, metodoPago } = req.body;

  // Validaciones
  if (!usuarioId || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'Debe incluir usuarioId y productos con id y cantidad' });
  }

  if (metodoPago && !metodosValidos.includes(metodoPago.toLowerCase())) {
  return res.status(400).json({ mensaje: 'Método de pago inválido o no proporcionado' });
  }

  try {
    // Buscar los productos por ID
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

    const estadoPedido = metodoPago ? 'pagado' : 'pendiente';
    const montoPagado = metodoPago ? total : 0;


    // Crear pedido
    const pedido = await Pedido.create({
      usuarioId,
      estado: estadoPedido,
      montoPagado
    });


    // Crear detalles del pedido
    for (const p of productos) {
      const productoBD = productosBD.find(prod => prod.id === p.id);
      await DetallePedido.create({
        pedidoId: pedido.id,
        productoId: p.id,
        cantidad: p.cantidad,
        precioUnitario: productoBD.precio
      });
    }

    // Respuesta al cliente
    res.status(201).json({
        mensaje: 'Pedido registrado con éxito',
        pedidoId: pedido.id,
        metodoPago: metodoPago || null,
        estado: estadoPedido,
        total,
        productos
    });


  } catch (error) {
    console.error('Error al registrar pedido:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

exports.confirmarPago = async (req, res) => {
  const { pedidoId, metodoPago } = req.body;

  if (!pedidoId || !metodoPago) {
    return res.status(400).json({ mensaje: 'Debe enviar pedidoId y metodoPago' });
  }

  if (!metodosValidos.includes(metodoPago.toLowerCase())) {
    return res.status(400).json({ mensaje: 'Método de pago inválido' });
  }

  try {
    const pedido = await Pedido.findByPk(pedidoId, {
      include: [{ model: DetallePedido }] // incluir detalles para calcular monto
    });

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    if (pedido.estado !== 'pendiente') {
      return res.status(400).json({ mensaje: 'Solo se pueden confirmar pedidos pendientes' });
    }

    // Calcular monto total basado en detalles
    let total = 0;

    // IMPORTANTE: puede que pedido.DetallePedidos sea undefined si no tiene detalles
    if (!pedido.DetallePedidos || pedido.DetallePedidos.length === 0) {
      return res.status(400).json({ mensaje: 'El pedido no tiene detalles para calcular monto' });
    }

    pedido.DetallePedidos.forEach(detalle => {
      total += parseFloat(detalle.precioUnitario) * detalle.cantidad;
    });

    pedido.estado = 'pagado';
    pedido.montoPagado = total;
    await pedido.save();

    res.json({
      mensaje: 'Pago confirmado',
      pedidoId: pedido.id,
      estado: pedido.estado,
      montoPagado: pedido.montoPagado,
      metodoPago
    });

  } catch (error) {
    console.error('Error al confirmar pago:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

exports.obtenerReciboPedido = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el pedido por ID
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    // Buscar los detalles del pedido
    const detalles = await DetallePedido.findAll({ where: { pedidoId: id } });

    // Buscar los productos relacionados
    const productos = await Producto.findAll();
    const resumen = detalles.map(detalle => {
      const producto = productos.find(p => p.id === detalle.productoId);
      return {
        nombre: producto?.nombre || 'Producto desconocido',
        cantidad: detalle.cantidad,
        precioUnitario: parseFloat(detalle.precioUnitario),
        subtotal: detalle.cantidad * parseFloat(detalle.precioUnitario)
      };
    });

    const total = resumen.reduce((acc, item) => acc + item.subtotal, 0);

    res.status(200).json({
      mensaje: '🧾 Recibo generado con éxito',
      pedidoId: pedido.id,
      estado: pedido.estado,
      productos: resumen,
      total
    });

  } catch (error) {
    console.error('Error al generar recibo:', error);
    res.status(500).json({ mensaje: 'Error al generar el recibo del pedido' });
  }
};

exports.anularPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    if (pedido.estado === 'anulado') {
      return res.status(400).json({ mensaje: 'El pedido ya está anulado' });
    }

    pedido.estado = 'anulado';
    await pedido.save();

    res.json({
      mensaje: 'Pedido anulado con éxito',
      pedidoId: pedido.id,
      estado: pedido.estado
    });
  } catch (error) {
    console.error('Error al anular pedido:', error);
    res.status(500).json({ mensaje: 'Error al anular el pedido' });
  }
};
