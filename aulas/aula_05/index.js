// importa o framework 

const express = require("express"); 

//importar o middleware de rotas 

const router = require('./routerTarefa'); 

// importa middleware de terceiros

const cors = require("cors"); 

// criar uma instancia da aplicação 

const app = express() ; 

// middleware embutido ou integrado -> ativar um middleware app.use() -> ele usa os middlewares na ordem de precedência. 

app.use(express.json());   // converte o json que recebe de requisição.  O primeiro middleware. (pra já converter tudo pra JSON)
app.use(express.urlencoded({extended:false})) ; //?param1=valor&param2=valor2 -> pegar parâmetros que vêm na URL. -> o extended padroniza. pra sempre vir assim.

// middleware de terceiros. 
app.use(cors()); 


// arrow-function (equivale, a mesma coisa )
// middleware de app
app.use( (req,res, next) => { 
    console.log("passei aqui")
    next(); 
})



app.use("/tarefas", router); 

// middleware de erro  -> encapsular os erros / os erros entram aqui 

app.use((err,req,res,next) => { 
    console.log(err.stack); 
    res.status(500).send("Algo de errado não está certo!")
})


// subir a aplicação (inicializar) -> geralmente é último código. 
app.listen(3000, () => {
    console.log("App está ON")
})