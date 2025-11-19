require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const usuariosRouter = require('./routes/usuariosRouter'); 

const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conexão com MongoDB Atlas estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com MongoDB Atlas:', err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/usuarios', usuariosRouter);

app.use('/api-docs', apidocsRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : undefined
  });
});

module.exports = app;