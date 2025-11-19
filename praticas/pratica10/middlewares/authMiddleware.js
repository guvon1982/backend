// pratica10/middlewares/authMiddleware.js (COMPLETO)

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Token não fornecido" });
    }
    
    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Passa o payload decodificado (que inclui o e-mail) para a próxima função
        req.usuario = decoded; 
        
        return next();
        
    } catch (error) {
        // Captura TokenExpiredError ou JsonWebTokenError (inválido)
        return res.status(401).json({ msg: "Token inválido" });
    }
};

// ... (exports.gerarToken, exports.cifrarSenha, exports.compararSenha) ...