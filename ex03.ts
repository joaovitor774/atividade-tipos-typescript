export {};

// ===== Exercício 03: Ficha de paciente =====

// Tipo de objeto escrito direto na anotação (sem type/interface)
const paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};

// Só os campos obrigatórios
const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergias =
    p.alergias && p.alergias.length > 0
      ? `Alergias: ${p.alergias.join(', ')}`
      : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente1));
console.log(resumo(paciente2));

// ===== Erros provocados =====
// paciente1.cpf = '000.000.000-00'; // ❌ error TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente2.peso = 70; // ❌ error TS2339: Property 'peso' does not exist on type '{ readonly cpf: string; nome: string; idade: number; plano: boolean; alergias?: string[] | undefined; contatoEmergencia?: { nome: string; telefone: string; } | undefined; }'.

// ===== Reflexão: object × Object × {} =====
let dados: object = paciente1;
// console.log(dados.nome); // ❌ error TS2339: Property 'nome' does not exist on type 'object'.
// Por quê? O tipo `object` só diz "isto é um valor não primitivo" (objeto, array, função...).
// Ele não carrega nenhuma informação sobre quais propriedades existem, então o
// compilador não deixa ler `.nome`. A variável aceita o paciente, mas "esquece" o formato dele.
console.log(typeof dados); // só para a variável ser usada

let x: {} = 10; // aceito: `{}` significa "qualquer valor que não seja null/undefined", inclusive primitivos
// let y: object = 10; // ❌ error TS2322: Type 'number' is not assignable to type 'object'.
// `object` exclui os primitivos (number, string, boolean...): só aceita valores não primitivos.
console.log(x);
