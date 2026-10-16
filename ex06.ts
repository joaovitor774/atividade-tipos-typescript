export {};

// ===== Exercício 06: Status do pedido no app de delivery =====

// 1. Enum numérico começando em 1
enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

// 2. Enum de string
enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

// 3. Mensagem para cada etapa
function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

// 4. Avança para a próxima etapa; Entregue e Cancelado não mudam
function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return status + 1;
}

// 5. Mapeamento reverso: número -> nome (só existe em enum numérico)
function linha(status: StatusPedido): string {
  return `[${status} - ${StatusPedido[status]}] ${mensagem(status)}`;
}

// 6. Simulação do pedido do início ao fim
let atual: StatusPedido = StatusPedido.Recebido;
console.log(linha(atual));
while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  console.log(linha(atual));
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// 7. Atribuir a string direto ao enum de string
// const pagamentoErrado: FormaPagamento = 'PIX'; // ❌ error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê? Enum de string é um tipo "nominal": só aceita os membros do próprio enum
// (FormaPagamento.Pix), mesmo que o texto seja idêntico ao valor. Assim o compilador
// garante que ninguém inventa 'PIX', 'pix' ou 'Pics' por fora do enum.
// (Em enum numérico isso não acontece: qualquer number é aceito.)

console.log(`Mapeamento reverso: StatusPedido[2] = ${StatusPedido[2]}`);
