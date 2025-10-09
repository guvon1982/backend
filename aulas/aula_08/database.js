//objeto cliente do mongodb
const { MongoClient } = require("mongodb");

//string de conexão
const url = "mongodb+srv://user:1234@cluster0.lcefbru.mongodb.net/"

const client = new MongoClient(url);

async function conecta() {
    try {
        await client.connect();
        return client.db("agenda");
    } catch (e) {
        console.log("Erro ao conectatr no MongoDB", e.message);

    }
}

module.exports = conecta;