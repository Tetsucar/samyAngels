const request = require('supertest');
const app = require('../../app'); 

describe('Actualizar Precio de Producto', () => {
  it('debe actualizar el precio de un producto existente', async () => {
    const productoId = 1; 
    const nuevoPrecio = 14000.00;

    const response = await request(app)
      .put(`/productos/${productoId}`)
      .send({ precio: nuevoPrecio });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', productoId);
    expect(response.body).toHaveProperty('precio', nuevoPrecio);
  });

  it('debe retornar 404 si el producto no existe', async () => {
    const productoIdInexistente = 9999;

    const response = await request(app)
      .put(`/productos/${productoIdInexistente}`)
      .send({ precio: 50.00 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Producto no encontrado');
  });
});