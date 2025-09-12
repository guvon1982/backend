// 1. Importando o pacote Express
const express = require('express');

// 2. Criando uma instância do Express
const app = express();

// 3. Definindo a porta do servidor
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Middleware de log personalizado
app.use((req, res, next) => {
  const agora = new Date();
  const dataHoraFormatada = `${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;
  console.log(`[${dataHoraFormatada}] ${req.method} ${req.originalUrl}`);
  next(); // Permite que a requisição siga para a próxima etapa
});

// Array em memória para armazenar as tarefas
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// ----------------------
// Roteador de Tarefas
// ----------------------

const tarefasRouter = express.Router();

// Rota GET /tarefas
tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

// Rota POST /tarefas
tarefasRouter.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome: req.body.nome,
    concluida: false
  };

  tarefas.push(novaTarefa);

  // Retorna a nova tarefa com o status 201 (Created)
  res.status(201).json(novaTarefa);
});

// Anexa o roteador de tarefas ao caminho '/tarefas'
app.use('/tarefas', tarefasRouter);


// Rota GET /tarefas
// Rota GET /tarefas/:tarefaId
tarefasRouter.get('/:tarefaId', (req, res, next) => {
  const idDaTarefa = parseInt(req.params.tarefaId);

  // Busca a tarefa no array
  const tarefaEncontrada = tarefas.find(t => t.id === idDaTarefa);

  // Se a tarefa não for encontrada, lança um erro
  if (!tarefaEncontrada) {
    // Cria um novo objeto de erro
    const error = new Error('Tarefa não localizada.');
    // Adiciona o status 404 ao erro
    error.status = 404;
    // Passa o erro para o próximo middleware
    return next(error); 
  }

  res.json(tarefaEncontrada);
});

// Rota PUT /tarefas
// Rota PUT /tarefas/:tarefaId para atualizar uma tarefa
tarefasRouter.put('/:tarefaId', (req, res, next) => {
  const idDaTarefa = parseInt(req.params.tarefaId);
  const { nome, concluida } = req.body;

  const indiceDaTarefa = tarefas.findIndex(t => t.id === idDaTarefa);

  // Se a tarefa não for encontrada, lança um erro
  if (indiceDaTarefa === -1) {
    const error = new Error('Tarefa não localizada.');
    error.status = 404;
    return next(error);
  }

  // Atualiza as informações da tarefa
  const tarefaAtualizada = {
    id: idDaTarefa,
    nome: nome || tarefas[indiceDaTarefa].nome,
    concluida: concluida !== undefined ? concluida : tarefas[indiceDaTarefa].concluida
  };

  tarefas[indiceDaTarefa] = tarefaAtualizada;

  res.json(tarefaAtualizada);
});

// Rota DELETE /tarefas
// Rota DELETE /tarefas/:tarefaId para remover uma tarefa
tarefasRouter.delete('/:tarefaId', (req, res, next) => {
  const idDaTarefa = parseInt(req.params.tarefaId);

  // Busca o índice da tarefa no array
  const indiceDaTarefa = tarefas.findIndex(t => t.id === idDaTarefa);

  // Se a tarefa não for encontrada, lança um erro
  if (indiceDaTarefa === -1) {
    const error = new Error('Tarefa não localizada.');
    error.status = 404;
    return next(error);
  }

  // Remove a tarefa do array
  tarefas.splice(indiceDaTarefa, 1);

  // Retorna o status 204 (No Content)
  res.status(204).end();
});

// ----------------------
// Fim do Roteador de Tarefas
// ----------------------

// 4. Criando uma rota inicial
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});


// ----------------------
// Middleware de Erro
// ----------------------

app.use((err, req, res, next) => {
  // Define o status da resposta como 404 (se o erro tiver status)
  // ou 400 (se o erro não tiver status)
  const statusCode = err.status || 400;

  // Envia a resposta JSON com o status e a mensagem de erro
  res.status(statusCode).json({
    mensagem: err.message
  });
});

// ----------------------
// Fim do Middleware de Erro
// ----------------------

// 5. Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Exporta a instância 'app' para uso em outros módulos
module.exports = app;



// 5. Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Exporta a instância 'app' para uso em outros módulos
module.exports = app;