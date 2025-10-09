# backend
Aula José Reginaldo - IESB

# Construção de Backend

Repositório criado para as aulas teóricas e atividades práticas da disciplina.

## Organização do Repositório

Este repositório está organizado da seguinte forma:
- **aulas/**: Pasta que contém os códigos das aulas teóricas.
- **praticas/**: Pasta que contém os códigos das atividades práticas.

## Comandos Básicos do NPM

Aqui estão alguns comandos básicos do NPM (Node Package Manager) que podem ser úteis durante o desenvolvimento de APIs.

1. Criar um projeto Node.js
```shell
npm init -y
```
2. Instalar pacotes
```shell
# instala para uso em produção 
npm install nome-do-pacote            
# instala como dependência de desenvolvimento
npm install --save-dev nome-do-pacote 
```
3. Desinstalar pacotes
```shell
npm uninstall nome-do-pacote
```
4. Executar scripts definidos no package.json
```shell
npm run nome-do-script
```
5. Criar um projeto base de API com Express Generator
```shell
npx express-generator --no-view nome-do-projeto
```
6. Iniciar o servidor de desenvolvimento com Nodemon
```shell
npm run dev
```
7. Executar testes unitários com Jest
```shell
npm run test
```


DockerCompose
sempre espaços duplos
docker compose up -d (sobem os arquivos)
services:
  db:
    image:  mongodb/mongodb-community-server:7.0-ubuntu2204
    container_name:  meumongo
    ports:
      - 27017:27017
    volumes:
      - ./:/data/db
    tty:  true
    stdin_open:  true

    Para subir o Service
    docker compose up -d

    testar conectando no BD (mongo)
    docker compose exec db mongosh

    show dbs - exibe os BDs ativos
    use [nome do BB]
    use meubancodedados (cria o seu BD)
    show collections (tabelas)
    criar tabelas - db.usuarios.insertOne({ nome: "Jose", email: "jose@iesb.edu.br })
    alterar elemento - db.usuario.updateOne({},{})
    procurar - db.usuarios.find({})




npm init -y
npm install mongodb
Dentro do package json:
"scripts": {
    "test": "node [nome].js"
  },