require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const tarefaRouter = require("./routes/tarefaRouter");

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

const app = express();

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao conectar no MongoDB: " + error);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/tarefas", tarefaRouter);

module.exports = app;