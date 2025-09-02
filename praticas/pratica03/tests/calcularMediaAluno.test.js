//Importe a função "calcularMediaAluno()" do arquivo "../src/calcularMediaAluno.js"
const { calcularMediaAluno } = require('../src/calcularMediaAluno.js');

//Defina um teste inicial para verificar se a função existe
test('Verifica se a função calcularMediaAluno existe', () => {
  expect(calcularMediaAluno).toBeDefined();
});

//Adicione um teste para quando "a1" ou "a2" estiverem indefinidos
test('Verifica se a função calcularMediaAluno lança um erro quando a1 ou a2 estão indefinidos', () => {
  expect(() => calcularMediaAluno(undefined, 8, 7)).toThrow('Notas a1 ou a2 não informadas');
  expect(() => calcularMediaAluno(9, undefined, 7)).toThrow('Notas a1 ou a2 não informadas');
});

//Adicione um teste para quando "a1" ou "a2" forem negativos
test('Verifica se a função calcularMediaAluno lança um erro quando a1 ou a2 são negativos', () => {
  expect(() => calcularMediaAluno(-1, 8, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(9, -2, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

//Adicione um teste para quando "a3" for negativa
test('Verifica se a função calcularMediaAluno lança um erro quando a3 é negativa', () => {
  expect(() => calcularMediaAluno(8, 7, -1)).toThrow('Nota a3 não pode ser negativa');
});

//Adicione um teste para o cálculo base quando "a3" não é informada
test('Verifica o cálculo da média quando a3 não é informada', () => {
  expect(calcularMediaAluno(8, 7)).toBeCloseTo(7.4);
  expect(calcularMediaAluno(9, 6)).toBeCloseTo(7.2);
});

//Adicione um teste para quando "a3" é informada e a melhor combinação é "a1" com "a3"
test('Verifica o cálculo da média quando a3 é informada e a melhor combinação é a1 com a3', () => {
  expect(calcularMediaAluno(8, 7, 9)).toBeCloseTo(8.6);
  expect(calcularMediaAluno(9, 6, 10)).toBeCloseTo(9.6);
});

// j) Adicione um teste para quando "a3" é informada e a melhor combinação é "a3" com "a2"
test('Verifica o cálculo da média quando a3 é informada e a melhor combinação é a3 com a2', () => {
  expect(calcularMediaAluno(6, 7, 9)).toBeCloseTo(8.2);
  expect(calcularMediaAluno(5, 6, 10)).toBeCloseTo(8.4);
});