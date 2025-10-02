const express = require('express');
const router = express.Router();

// Importa o controller
const tarefaController = require('../controllers/tarefaController');

// Define as rotas e aponta para as funções do controller
router.get('/', tarefaController.listar);
router.get('/:tarefaId', tarefaController.buscarPeloId);
router.post('/', tarefaController.criar);
router.put('/:tarefaId', tarefaController.atualizar);
router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;