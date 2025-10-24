const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O campo "nome" é obrigatório.'], // 'true' e uma mensagem de erro
      minlength: [3, 'O campo "nome" deve ter no mínimo 3 caracteres.']
    },

    preco: {
      type: Number,
      required: [true, 'O campo "preco" é obrigatório.']
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Produto', schema);