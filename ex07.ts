export {};

// ===== Exercício 07: Central de notificações =====

// 1. Tipo de função
type Notificador = (destinatario: string, mensagem: string) => void;

// 2 e 4. Três notificadores
const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // return antecipado (vazio)
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

// 3. Envia para todos os destinatários usando forEach
function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], aviso, porSms);
notificarTodos(['(69) 99999-0000'], 'Aviso muito longo. '.repeat(10), porSms);

// 5. Função void não pode retornar valor
// function teste(): void { return 10; } // ❌ error TS2322: Type 'number' is not assignable to type 'void'.

// 6. Reflexão: por que isto é aceito?
const contar: Notificador = (d, m) => m.length;
console.log(`contar devolve ${contar('x', 'abc')} em runtime, mas o tipo diz void`);
// Quando um TIPO DE FUNÇÃO declara retorno `void`, isso não significa "a função não
// pode retornar nada", e sim "quem chama não deve usar o valor retornado". O TypeScript
// aceita qualquer função cujo retorno seja ignorado, porque isso é seguro para o chamador.
// É o que permite passar `(x) => lista.push(x)` (que retorna number) ao forEach, por
// exemplo. A regra estrita só vale para uma função declarada diretamente com `: void`.
