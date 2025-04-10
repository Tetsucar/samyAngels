const metodosValidos = ['efectivo', 'nequi', 'bancolombia'];

exports.elegirMetodoPago = (req, res) => {
  const { metodo } = req.body;

  if (!metodo) {
    return res.status(400).json({ mensaje: 'Debe seleccionar un método de pago' });
  }

  if (!metodosValidos.includes(metodo.toLowerCase())) {
    return res.status(400).json({ mensaje: 'Método de pago inválido' });
  }

  return res.status(200).json({
    mensaje: `Método de pago "${metodo}" seleccionado correctamente`,
    metodo
  });
};
