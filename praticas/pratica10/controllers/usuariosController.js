// pratica10/controllers/usuariosController.js

const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel'); 

// ==========================================================
// FUNÇÃO: CRIAR USUÁRIO (POST /usuarios)
// ==========================================================
exports.criar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        // CORREÇÃO: Validação explícita para evitar erro de bcrypt com 'undefined'
        if (!email || !senha) {
             // Lança erro para ser capturado no catch e retornar 422
             const validationError = new Error('Email e Senha são obrigatórios');
             validationError.name = 'ValidationError'; 
             throw validationError;
        }
        
        const senhaCifrada = cifrarSenha(senha);

        const novoUsuario = await Usuario.create({
            email: email, 
            senha: senhaCifrada
        });

        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });

    } catch (error) {
        // Tratamento de erro de unicidade (E11000)
        if (error.code === 11000) {
            return res.status(422).json({ msg: "Este e-mail já está cadastrado." });
        }
        
        // Tratamento de erro de validação (para o teste 422)
        if (error.name === 'ValidationError') {
            return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
        }
        
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ msg: "Erro interno do servidor." });
    }
};

// ==========================================================
// FUNÇÃO: ENTRAR (LOGIN - POST /usuarios/login)
// ==========================================================
exports.entrar = async (req, res) => {
    try {
        const { usuario, senha } = req.body; 

        const usuarioEncontrado = await Usuario.findOne({ email: usuario });
        
        if (!usuarioEncontrado) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }
        
        const senhaCorreta = compararSenha(senha, usuarioEncontrado.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }
        
        const payload = { email: usuario }; 
        const token = gerarToken(payload);
        
        return res.status(200).json({ token: token });

    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ msg: "Erro interno do servidor." });
    }
};

// ==========================================================
// FUNÇÃO: RENOVAR TOKEN (POST /usuarios/renovar)
// ==========================================================
exports.renovar = async (req, res) => {
    try {
        const token = gerarToken(req.usuario);
        
        return res.status(200).json({ token: token });

    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return res.status(500).json({ msg: "Erro interno do servidor." });
    }
};

// ==========================================================
// FUNÇÃO: REMOVER USUÁRIO (DELETE /usuarios/:id)
// ==========================================================
exports.remover = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        
        // Uso da função findByIdAndDelete (Mongoose)
        await Usuario.findByIdAndDelete(usuarioId); 

        return res.status(204).end();

    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        return res.status(500).json({ msg: "Erro interno do servidor ao tentar excluir." });
    }
};