const express = require('express');

const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  const payload = { email: req.body.usuario };

  try {
    const token = gerarToken(payload);
    
    res.status(200).json({ token: token });

  } catch (error) {
    res.status(500).json({ msg: 'Erro interno ao gerar o token' });
  }
});

router.post('/renovar', verificarToken, (req, res) => {
  try {
    const payload = { email: req.usuario.email };

    const token = gerarToken(payload); 
    
    res.status(200).json({ token: token });

  } catch (error) {
    res.status(500).json({ msg: 'Erro interno ao gerar o token' });
  }
});

module.exports = router;