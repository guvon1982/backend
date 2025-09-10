const express = require("express"); 

// middleware de rotas 
const router = express.Router(); 

router.get('/', (req,res) => {
    res.send('Chegou aqui')
}) ; 

// quando dá o post recebe o 201 -> o send é a mensagem que aparecerá. 

router.post('/', (req,res) => { 
    console.log(req.body);// req tem uma propriedade body, que pega o que foi enviado no POST. Dependendo do que for tem que ter uma middleware instalada de terceiros.
    res.status(201).send("Inserido com sucesso")
})

// req tem uma propriedade chamada body. na de cima. 

router.get("/:id", (req,res) => { 
    const {id} = req.params ;  // {id:1, param2:5, param3:6 } -> desestruturação do objeto -> pegar só uma parte de tudo que o objeto oferece. 
    if(id==1) return res.send("Achei")  
    throw Error("Não achei")
    }) ; 

    // acima se lança um erro, pra ele entrar no erro embaixo.

router.put("/:id", (req,res) => { 
    const {id} = req.params ; 
    if(id==1) res.send("Tarefa alterada.")
    res.status(404).send("Tarefa não encontrada")
}) ; 

router.delete("/:id", (req,res) => { 
    res.status(204).end() ; //tem que dar o end() no final porque o status 204 é sem corpo
})

module.exports = router;