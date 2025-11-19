// pratica10/routes/usuariosRouter.js (COMPLETO)

const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/', usuariosController.criar); 
router.post('/login', usuariosController.entrar); 
// Ordem correta: Primeiro verifica, depois renova.
router.post('/renovar', verificarToken, usuariosController.renovar); 
// Ordem correta: Primeiro verifica, depois remove.
router.delete('/:id', verificarToken, usuariosController.remover); 

module.exports = router;