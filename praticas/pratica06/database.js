const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://user:1234@cluster0.lcefbru.mongodb.net/';

const client = new MongoClient(url);

async function conectarDb() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    return client.db('agenda');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { conectarDb };