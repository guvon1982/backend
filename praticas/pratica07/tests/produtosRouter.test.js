const supertest = require('supertest');
const app = require('../app'); 

const mongoose = require('mongoose');

const request = supertest(app);

let produtoId; 

afterAll(async () => {
  await mongoose.connection.close();
});


describe('API de Produtos (/produtos)', () => {

  test('Deve criar um produto (POST /produtos) e retornar 201', async () => {
    const response = await request.post('/produtos')
      .send({
        nome: "Laranja",
        preco: 10.0
      });

    expect(response.status).toBe(201); 
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);

    produtoId = response.body._id;
  });

  test('Deve retornar 422 (POST /produtos) ao tentar criar sem JSON', async () => {
    const response = await request.post('/produtos').send({});

    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('Deve retornar uma lista de produtos (GET /produtos) e status 200', async () => {
    const response = await request.get('/produtos');
    
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Deve retornar um produto específico (GET /produtos/:id) e status 200', async () => {
    const response = await request.get(`/produtos/${produtoId}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  test('Deve retornar 400 (GET /produtos/0) por parâmetro inválido', async () => {
    const response = await request.get('/produtos/0');

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('Deve retornar 404 (GET /produtos/:id) para produto não encontrado', async () => {
    const idInexistente = '000000000000000000000000';
    const response = await request.get(`/produtos/${idInexistente}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('Deve atualizar um produto (PUT /produtos/:id) e retornar 200', async () => {
    const response = await request.put(`/produtos/${produtoId}`)
      .send({
        nome: "Laranja Pera",
        preco: 18.00
      });

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.00);
  });

  test('Deve retornar 422 (PUT /produtos/:id) ao tentar atualizar sem JSON', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({});

    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('Deve retornar 400 (PUT /produtos/0) por parâmetro inválido', async () => {
    const response = await request.put('/produtos/0').send({ nome: "Teste", preco: 1 });

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('Deve retornar 404 (PUT /produtos/:id) para produto não encontrado', async () => {
    const idInexistente = '000000000000000000000000';
    const response = await request.put(`/produtos/${idInexistente}`)
      .send({ nome: "Teste", preco: 1 });

    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('Deve deletar um produto (DELETE /produtos/:id) e retornar 204', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('Deve retornar 400 (DELETE /produtos/0) por parâmetro inválido', async () => {
    const response = await request.delete('/produtos/0');

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('Deve retornar 404 (DELETE /produtos/:id) para produto não encontrado', async () => {
    const response = await request.delete(`/produtos/${produtoId}`); 
    expect(response.status).toBe(404);

    
    const responseInexistente = await request.delete('/produtos/000000000000000000000000');

    expect(responseInexistente.status).toBe(404);
    expect(responseInexistente.type).toBe('application/json');
    expect(responseInexistente.body).toHaveProperty('msg', 'Produto não encontrado');
  });

});