import { soma, divisao } from "./index.js";

if (soma(1,1) === 2) console.log("Passou 1o!");
else console.error("Deu erro 1o");

if (soma(1,0) === 1) console.log("Passou 2o!");
else console.error("Deu erro 2o");

if (soma(1,-1) === 0) console.log("Passou 3o!");
else console.error("Deu erro3o");

if (divisao(1,1) === 1) console.log("Passou 4o!");
else console.error("Deu erro 4o"); 

if (divisao(6,3) === 2) console.log("Passou 5o!");
else console.error("Deu erro 5o"); 

if (divisao(1,0) === undefined) console.log("Passou 6o!");
else console.error("Deu erro 6o"); 