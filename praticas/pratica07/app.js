require('dotenv').config();

const mongoose = require('mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var produtosRouter = require('./routes/produtosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const dbUser = process.env.MONGODB_USER;
const dbPass = process.env.MONGODB_PASSWORD;
const dbHost = process.env.MONGODB_HOST;
const dbName = process.env.MONGODB_DATABASE;

const mongoURI = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Conectado com sucesso ao MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB Atlas:", err);
    process.exit(1); 
  });

app.use('/produtos', produtosRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;