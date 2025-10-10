const { Tarefa } = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);

  try {
    await tarefa.init();
    await tarefa.inserir();
    console.log(`Tarefa "${nome}" adicionada com sucesso!`);
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);

  await tarefa.init();
  await tarefa.buscar();

  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);

  try {
    await tarefa.init();
    await tarefa.buscar();

    if (tarefa.id) {
      tarefa.concluida = concluida;
      await tarefa.alterar();
      console.log(`Tarefa "${nome}" atualizada para concluída: ${concluida}`);
    } else {
      console.log(`Tarefa "${nome}" não encontrada.`);
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);

  try {
    await tarefa.init();
    await tarefa.buscar();

    if (tarefa.id) {
      await tarefa.deletar();
      console.log(`Tarefa "${nome}" removida com sucesso!`);
    } else {
      console.log(`Tarefa "${nome}" não encontrada para remoção.`);
    }
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};