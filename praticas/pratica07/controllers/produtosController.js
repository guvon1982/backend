const mongoose = require('mongoose');

const Produto = require('../models/produtosModel');


const criar = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    
    res.status(201).json(novoProduto);

  } catch (error) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};


const listar = async (req, res) => {
  try {
    const produtosCadastrados = await Produto.find({});
    
    res.status(200).json(produtosCadastrados);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const buscar = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Parâmetro inválido" });
    }

    const produtoEncontrado = await Produto.findOne({ _id: req.params.id });

    if (!produtoEncontrado) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    req.produto = produtoEncontrado;
    
    next();

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const exibir = (req, res) => {
  res.status(200).json(req.produto);
};


const atualizar = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
    const id = req.params.id;
    const updateData = req.body;
    const options = { 
      runValidators: true,
      new: true
    }; 
    
    const produtoAtualizado = await Produto.findOneAndUpdate({ _id: id }, updateData, options);

    if (!produtoAtualizado) {
        return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.status(200).json(produtoAtualizado);

  } catch (error) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};


const remover = async (req, res) => {
  try {
    await Produto.findOneAndDelete({ _id: req.params.id });
    
    res.status(204).send();

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};