// config/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './config/swagger.json';
const endPointsFiles = ['./app.js']; 

const doc = {
  info: {
    title: 'API Samyangels',
    description: 'Documentación generada automáticamente para el proyecto Samyangels',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endPointsFiles, doc);

