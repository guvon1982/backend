const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

describe('API de Tarefas', () => {

    let taskId;

    it('deve retornar 200 e um JSON para GET /tarefas', async () => {
        const response = await request.get('/tarefas');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('deve retornar 201 e um JSON para POST /tarefas', async () => {
        const response = await request.post('/tarefas').send({
            nome: 'Estudar Node',
            concluida: false
        });
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        
        taskId = response.body.id; 
    });

    it('deve retornar 200 e um JSON para GET /tarefas/:id', async () => {
        const response = await request.get(`/tarefas/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('deve retornar 404 e um JSON para GET /tarefas/1 com id inválido', async () => {
        const response = await request.get('/tarefas/1');
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('deve retornar 200 e um JSON para PUT /tarefas/:id', async () => {
        const response = await request.put(`/tarefas/${taskId}`).send({
            nome: 'Estudar Node e Express',
            concluida: true
        });
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('deve retornar 404 e um JSON para PUT /tarefas/1 com id inválido', async () => {
        const response = await request.put('/tarefas/1').send({
            nome: 'Teste',
            concluida: true
        });
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('deve retornar 204 e sem conteúdo para DELETE /tarefas/:id', async () => {
        const response = await request.delete(`/tarefas/${taskId}`);
        expect(response.status).toBe(204);
    });

    it('deve retornar 404 e um JSON para DELETE /tarefas/1 com id inválido', async () => {
        const response = await request.delete('/tarefas/1');
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});