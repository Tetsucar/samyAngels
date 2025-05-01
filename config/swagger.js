// config/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './config/swagger.json';
const endPointsFiles = ['./app.js']; // Asegúrate de que app.js sea la ruta correcta

const doc = {
  info: {
    title: 'API Samyangels',
    description: 'Documentación generada automáticamente para el proyecto Samyangels',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endPointsFiles, doc);

