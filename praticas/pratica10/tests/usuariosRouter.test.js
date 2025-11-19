// pratica10/tests/usuariosRouter.test.js

const supertest = require('supertest');
const app = require('../app');

const mongoose = require('mongoose');
// CORREÇÃO: Usar o nome do arquivo correto (usuariosModel)
const Usuario = require('../models/usuariosModel'); 

const request = supertest(app);

let usuarioId = ''; 
let authToken = ''; 

describe('Testes para o recurso /usuarios', () => {

    beforeAll(async () => {
        await Usuario.deleteOne({ email: 'usuario@email.com' });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /usuarios deve criar um usuário e retornar status 201', async () => {
        const novoUsuario = {
            email: 'usuario@email.com',
            senha: 'abcd1234'
        };

        const response = await request.post('/usuarios')
            .send(novoUsuario)
            .expect(201)

        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe(novoUsuario.email);

        usuarioId = response.body._id;
    });

    test('POST /usuarios sem JSON deve retornar status 422', async () => {
        const response = await request.post('/usuarios')
            .send({}) 
            .expect(422); 

        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Email e Senha são obrigatórios');
    });

    test('POST /usuarios/login deve autenticar e retornar status 200 com token', async () => {
        const credenciais = {
            usuario: 'usuario@email.com',
            senha: 'abcd1234'
        };

        const response = await request.post('/usuarios/login')
            .send(credenciais)
            .expect(200);

        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
        authToken = response.body.token; 
    });

    test('POST /usuarios/login sem JSON deve retornar status 401', async () => {
        const response = await request.post('/usuarios/login')
            .send({})
            .expect(401);

        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Credenciais inválidas');
    });

    test('POST /usuarios/renovar com token válido deve retornar status 200 com novo token', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('authorization', `Bearer ${authToken}`)
            .expect(200);

        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
    });

    test('POST /usuarios/renovar com token inválido deve retornar status 401', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('authorization', 'Bearer 123456789')
            .expect(401);

        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Token inválido');
    });

    test('DELETE /usuarios/${id} com token deve retornar status 204', async () => {
        expect(usuarioId).toBeTruthy(); 

        const response = await request.delete(`/usuarios/${usuarioId}`)
            .set('authorization', `Bearer ${authToken}`)
            .expect(204); 

        expect(response.body).toEqual({}); 
    });

});