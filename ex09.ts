export {};

// ===== Exercício 09: Lendo a resposta de uma API de clima =====

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1. Versão com any (para ver o problema)
function lerComAny(json: string): string {
  const dados: any = JSON.parse(json);
  return dados.temperatura.toFixed(1);
}
// Com respostaQuebrada, o compilador NÃO reclama (any desliga a checagem), mas na execução:
//   TypeError: dados.temperatura.toFixed is not a function
// porque "quente" é string e string não tem toFixed. O erro só aparece rodando o programa.

// 3. Função que nunca retorna: sempre lança
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2. Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      return falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof dados !== 'object' || dados === null) {
    return falhar('resposta não é um objeto');
  }
  if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
    return falhar('campo "cidade" inválido');
  }
  const cidade: string = dados.cidade;
  if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
    return falhar('campo "temperatura" inválido');
  }
  const temperatura: number = dados.temperatura;

  return { cidade, temperatura };
}

// 4 e 5. try/catch com catch (erro: unknown) e as três respostas
console.log('--- Versão com any (o erro só aparece na execução) ---');
try {
  console.log(lerComAny(respostaOk));
  console.log(lerComAny(respostaQuebrada));
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro em runtime: ${erro.message}`);
  }
}

console.log('--- Versão segura com unknown ---');
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}
