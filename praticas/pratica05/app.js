var express = require('express');
var logger = require('morgan'); // Morgan é usado para registrar os logs de requisição no console

var tarefaRouter = require('./routes/tarefaRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use('/tarefas', tarefaRouter);

module.exports = app;