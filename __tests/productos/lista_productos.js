const request = require('supertest');
const app = require('../../app');
const Producto = require('../../models/producto');

describe('Listado de productos', () => {
  test('Debería listar los productos disponibles desde la base de datos', async () => {
    // Obtener los productos desde la base de datos
    const productosEnBD = await Producto.findAll();
    const productosFiltrados = productosEnBD.map(p => {
      const { id, nombre, categoria, precio } = p.toJSON();
      return { id, nombre, categoria, precio: parseFloat(precio) };
    });

    // Imprimir cada producto en su propia línea con formato claro
    console.log('Productos filtrados en la base de datos: [');
    productosFiltrados.forEach(p => {
      console.log(`  { id: ${p.id}, nombre: '${p.nombre}', categoria: '${p.categoria}', precio: ${p.precio} },`);
    });
    console.log(']');

    // Realizar la petición al endpoint
    const res = await request(app).get('/productos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(productosEnBD.length);

    // Comparar cada producto individualmente
    productosFiltrados.forEach(producto => {
      const productoEnRespuesta = res.body.find(p => p.nombre === producto.nombre);
      expect(productoEnRespuesta).toBeDefined();
      expect(parseFloat(productoEnRespuesta.precio)).toBeCloseTo(producto.precio);
      expect(productoEnRespuesta).toMatchObject({
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria
      });
    });
  });
});


