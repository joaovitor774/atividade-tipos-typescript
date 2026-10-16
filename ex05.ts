export {};

// ===== Exercício 05: Boletim do clima =====

// 1. Tupla nomeada [cidade, temperatura]
const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

// 2. Devolve [mínima, máxima]
function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

// 3. Percorre as leituras desestruturando cada tupla
for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temperaturas: number[] = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturas);
const media: number = temperaturas.reduce((acc, t) => acc + t, 0) / temperaturas.length;

console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// 4. Tupla com elemento opcional
const contato1: [nome: string, telefone: string, email?: string] = [
  'Rita Alves',
  '(69) 99999-1111',
  'rita@jornal.com',
];
const contato2: [nome: string, telefone: string, email?: string] = ['Paulo Reis', '(69) 98888-2222'];

for (const [nome, telefone, email] of [contato1, contato2]) {
  console.log(`Contato: ${nome} - ${telefone}${email ? ` - ${email}` : ''}`);
}

// 5. Tupla com elemento rest: cidade seguida de qualquer quantidade de temperaturas
const historicoSemanal: [string, ...number[]] = ['Porto Velho', 33, 34, 35, 32, 34, 36, 33];

function mediaHistorico(historico: [string, ...number[]]): number {
  const [, ...temps] = historico;
  if (temps.length === 0) {
    return 0;
  }
  return temps.reduce((acc, t) => acc + t, 0) / temps.length;
}

console.log(`Média semanal de ${historicoSemanal[0]}: ${mediaHistorico(historicoSemanal).toFixed(1)}°C`);

// 6. Tupla somente leitura
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // ❌ error TS2540: Cannot assign to '0' because it is a read-only property.
console.log(`Capital: ${capitalOficial[1]} (${capitalOficial[0]})`);
