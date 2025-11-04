const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

let token;
let novoToken;


describe('Suite de Testes da API Pratica08', () => {

  test('e) GET /produtos (sem token) deve retornar 401 e JSON', async () => {
    const response = await request.get('/produtos');

    expect(response.status).toBe(401); 
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('f) GET /produtos (token inválido) deve retornar 401 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('Authorization', 'Bearer 123456789');

    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('g, h) POST /usuarios/login (correto) deve retornar 200, JSON e salvar o token', async () => {
    const loginData = {
      usuario: 'email@exemplo.com',
      senha: 'abcd1234'
    };

    const response = await request
      .post('/usuarios/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token'); 

    token = response.body.token;
  });

  
  test('i) GET /produtos (token válido) deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  
  test('j, k) POST /usuarios/renovar (token válido) deve retornar 200, JSON e novo token', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');

    
    novoToken = response.body.token;
  });

  
  test('l) GET /produtos (token renovado) deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('Authorization', `Bearer ${novoToken}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

});