const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Cálculo del total según id y cantidad', () => {
  test('Debería calcular correctamente el total de productos seleccionados', async () => {
    // Obtener algunos productos reales desde la base de datos
    const productos = await Producto.findAll({ limit: 2 });

    // Definir cantidades para simular una compra
    const seleccion = productos.map((producto, index) => ({
      id: producto.id,
      cantidad: index + 1 // cantidad 1 para el primero, 2 para el segundo
    }));

    // Calcular el total esperado
    const totalEsperado = seleccion.reduce((acc, item, i) => {
      const precio = parseFloat(productos[i].precio);
      return acc + item.cantidad * precio;
    }, 0);

    console.log('Productos seleccionados:', seleccion);
    console.log('Total esperado:', totalEsperado);

    // Enviar la selección al endpoint de cálculo
    const res = await request(app)
      .post('/carrito/calcular-total')
      .send({ productos: seleccion });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBeCloseTo(totalEsperado);
  });
});
