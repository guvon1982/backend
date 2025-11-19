const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();

try {
    const file = fs.readFileSync('./swagger.yaml', 'utf8');
    
    const swaggerDocument = YAML.parse(file);

    router.use('/', swaggerUI.serve);

    router.get('/', swaggerUI.setup(swaggerDocument));

} catch (e) {
    console.error('Erro ao carregar ou analisar swagger.yaml:', e.message);
    router.get('/', (req, res) => {
        res.status(500).json({ error: 'Falha ao carregar a documentação da API.' });
    });
}

module.exports = router;