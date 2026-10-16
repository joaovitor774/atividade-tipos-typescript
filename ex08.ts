export {};

// ===== Exercício 08: Formulário de cadastro =====

// 1. Union type + estreitamento com typeof
const codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  // aqui o TypeScript sabe que `c` é string
  const digitos = c.replace(/\D/g, '');
  return `CLI-${digitos.padStart(4, '0')}`;
}

// 2. Tipo literal
type Tamanho = 'P' | 'M' | 'G' | 'GG';
let tamanho: Tamanho = 'M';
// tamanho = 'XG'; // ❌ error TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

// 3. Frete por região
type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// 4. string | null
const rua: string = 'Rua das Flores, 100';
const complemento: string | null = null;
const textoComplemento: string = complemento === null ? '(sem complemento)' : complemento;

// 5. Só os dígitos do telefone
function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// 6. Inferência de literais
const r = 'sul'; // const: o tipo inferido é o literal 'sul'
let r2 = 'sul'; // let: o tipo é alargado (widening) para string
console.log(`Frete (const r): R$ ${calcularFrete(r).toFixed(2)}`);
// calcularFrete(r2); // ❌ error TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
// Por quê? Uma `const` nunca muda, então o TypeScript guarda o tipo mais específico
// ('sul'). Já a `let` pode receber outro texto depois, então ele infere `string`,
// que é amplo demais para o parâmetro, que só aceita as 5 regiões.
// Correção com as const: fixa o literal mesmo no let.
let r3 = 'sul' as const;
console.log(`Frete (let + as const): R$ ${calcularFrete(r3).toFixed(2)}`);
r2 = 'qualquer texto'; // só para mostrar que o let string aceita isso

// ===== Saída =====
console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: ${rua} - ${textoComplemento}`);
console.log(`Frete para o sul: R$ ${calcularFrete('sul').toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
console.log(`Telefone (número): ${limparTelefone(69999990000)}`);
console.log(`Código antigo: ${formatarCodigo('CLI-0042')}`);
