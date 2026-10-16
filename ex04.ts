export {};

// ===== Exercício 04: Lista de compras do mês =====

const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

// Somente map, filter e reduce (sem for)
const nomes: string[] = itens.map((item) => item.nome);
const caros = itens.filter((item) => item.preco > 10);
const total: number = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

// readonly: o array não pode ser modificado
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Bebidas'); // ❌ error TS2339: Property 'push' does not exist on type 'readonly string[]'.

// Matriz: quantidade de itens em cada posição das 3 prateleiras
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const itensNaDespensa: number = despensa.reduce(
  (acc, prateleira) => acc + prateleira.reduce((soma, qtd) => soma + qtd, 0),
  0,
);

// Desestruturação: primeiro e segundo item
const [primeiro, segundo] = itens;

// Spread: nova lista com um item extra, sem alterar a original
const listaNova = [...itens, { nome: 'Açúcar 1kg', preco: 5.49, quantidade: 1 }];

// ===== Saída =====
console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((item) => item.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${itensNaDespensa}`);

// Extras (desestruturação, spread e readonly)
console.log(`Primeiro e segundo: ${primeiro.nome} e ${segundo.nome}`);
console.log(`Lista original: ${itens.length} itens | Lista nova: ${listaNova.length} itens`);
console.log(`Categorias: ${categorias.join(', ')}`);
