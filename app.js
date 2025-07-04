var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var usuariosRouter= require('./routes/usuarios');
var carritoRouter = require('./routes/carrito');
const pagoRouter = require('./routes/pago');
const pedidoRouter = require('./routes/pedido');
const recuperacionRouter = require('./routes/recuperacion');
const autenticacion = require('./middlewares/autenticacion');

var app = express();

// Swagger: documentación de la API
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/document', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(autenticacion);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/carrito', carritoRouter);
app.use('/pago', pagoRouter);
app.use('/pedido', pedidoRouter);
app.use('/recuperacion', recuperacionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;