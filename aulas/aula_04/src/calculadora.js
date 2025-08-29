function soma(a, b) {
    return a - (-b);
}

function multiplicacao(a,b){
    return a * b;
}

function divisao(a,b){
    if (b === 0) throw Error("Divisão por zero!")
}

module.exports = { soma, multiplicacao, divisao };