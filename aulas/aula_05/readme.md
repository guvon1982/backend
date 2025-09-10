STATUS HTTP 

Código	                           Significado	                              Quando usar
200 OK	                             Sucesso	                              GET, PUT, PATCH bem-sucedidos
201 Created	                         Criado	                                  POST que cria algo
204 No Content	                 Sucesso sem corpo	                          DELETE bem-sucedido
301 Moved Permanently	      Redirecionamento permanente	                  URL mudou
302 Found	                  Redirecionamento temporário	                  URL temporária
304 Not Modified	              Não modificado	                          Cache do cliente ainda válido
400 Bad Request	                 Erro do cliente	                          Dados enviados inválidos
401 Unauthorized	             Não autenticado	                          Falta login/token
403 Forbidden	                    Proibido	                              Usuário não tem permissão
404 Not Found	                 Não encontrado	                              Recurso não existe
409 Conflict	                    Conflito	                              Dados já existentes (ex: usuário duplicado)
422 Unprocessable Entity	     Entidade inválida	                          Validação de dados falhou
500 Internal Server Error	     Erro interno	                              Erro genérico no servidor
502 Bad Gateway	                Gateway inválido	                          Erro entre servidores
503 Service Unavailable	        Serviço indisponível	                      Manutenção ou sobrecarga
504 Gateway Timeout	            Tempo esgotado	                              Servidor não respondeu a tempo



1 - rodar o npm init -y 

2 - rodar o npm install express 

3 - npm install --save-dev nodemon (pra rodar o node toda hora, pra não ter que atualizar toda hora que faz algo)

4 - entrar no package.json e alterar as regras de script -> "dev": "nodemon index.js", -> colocar o caminho do arquivo. 

5 - const express = require("express"); no index.js (página comentada com os passos)

6 - app.use( function (rec,res) { 
})

app.use( (req,res) => { 
    console.log("passei aqui")
})

Toda requisição passa aqui, o nível mais externo dos middlewares. -> bom para servições de auditoria. Porque tudo vai passar aqui. 

se não passar nada ele vai ficar pra sempre dentro desse middleware. 
- passa o parâmetro next, e chama o next() depois da chamada que foi feita. 

independe do verbo da requisição (GET, POST, PUT, DELETE, PATCH, GET(ID), ...{qualquer})


7 - Segundo middleware
pra pegar outras hierarquias é necessário criar o nível de rotas. /usuarios /produtos /tarefas /ids /{qualquerCoisa} 
aqui que trata-se os verbos. 

const route = express.Router() ; 

sintaxe: 
        (rota    o que vai fazer)

router.get('/', (req,res) => {
    res.send('Chegou aqui')
})

app.use(router); 

app.use('/tarefas', router) -> ele já vai atender a rota tarefas. 

8 - middleware embutido -> vem do próprio express 


9 - middleware de terceiros -> middlewares que instalamos que vem de bibliotecas externas. 

10 - middleware de erro, tem que ser o último -geralmente- 
se der erro, passa para a middleware de erro. 
Basta passar o parâmetro err

app.use((err,req,res,next) => { 
    
})

11- npm install cors -> domínios que podem acessar a API. -> Para segurança.