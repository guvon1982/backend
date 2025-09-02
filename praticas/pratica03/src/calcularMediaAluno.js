// Declaração da função calcularMediaAluno(a1, a2, a3) com todas as validações e lógicas
function calcularMediaAluno(a1, a2, a3) {
  // b) Validação de undefined em a1 ou a2
  if (a1 === undefined || a2 === undefined) {
    throw new Error('Notas a1 ou a2 não informadas');
  }

  // d) Validação de notas a1 ou a2 negativas
  if (a1 < 0 || a2 < 0) {
    throw new Error('Notas a1 ou a2 não podem ser negativas');
  }

  // h) Validação de nota a3 negativa
  if (a3 !== undefined && a3 < 0) {
    throw new Error('Nota a3 não pode ser negativa');
  }

  // f) Implementação do cálculo base quando a3 é undefined
  if (a3 === undefined) {
    return a1 * 0.4 + a2 * 0.6;
  }

  // k) Implementação da regra final do máximo
  const media1 = a1 * 0.4 + a2 * 0.6;
  const media2 = a1 * 0.4 + a3 * 0.6;
  const media3 = a2 * 0.4 + a3 * 0.6;

  return Math.max(media1, media2, media3);
}

// c) Exporta a função para ser utilizada por outros módulos
module.exports = { calcularMediaAluno };