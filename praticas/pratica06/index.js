const readline = require('readline-sync');

const controlador = require('./controlador');

function menu() {
  console.log('--- Gerenciador de Tarefas ---');
  console.log('1. Adicionar Tarefa');
  console.log('2. Buscar Tarefa');
  console.log('3. Atualizar Tarefa');
  console.log('4. Remover Tarefa');
  console.log('5. Sair');
  console.log('------------------------------');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':
      const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdicionar);
      break;
    case '2':
      const nomeBuscar = readline.question('Digite o nome da tarefa a ser buscada: ');
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada && tarefaEncontrada.id) {
        console.log('Tarefa encontrada:', tarefaEncontrada);
      } else {
        console.log('Tarefa nao encontrada.');
      }
      break;
    case '3':
      const nomeAtualizar = readline.question('Digite o nome da tarefa a ser atualizada: ');
      const concluidaInput = readline.question('A tarefa foi concluida? (sim/nao): ');
      const concluida = concluidaInput.toLowerCase() === 'sim';
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;
    case '4':
      const nomeRemover = readline.question('Digite o nome da tarefa a ser removida: ');
      await controlador.removerTarefa(nomeRemover);
      break;
    case '5':
      console.log('Saindo...');
      process.exit(0);
      break;
    default:
      console.log('Opcao invalida. Tente novamente.');
  }
  readline.question('Pressione ENTER para continuar...');
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opcao: ');
    await escolherOpcao(opcao);
  }
}

main();