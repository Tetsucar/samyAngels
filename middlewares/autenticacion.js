// middlewares/autenticacion.js
module.exports = (req, res, next) => {
  // ⚠ Simula que siempre hay un usuario autenticado
  req.user = { id: 1 }; // Ajusta el ID según el usuario dueño del pedido

  next();
};
