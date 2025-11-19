// pratica10/models/usuariosModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    senha: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true 
});

// Solução anti-OverwriteModelError: Verifica se o modelo 'Usuario' já existe
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', userSchema);