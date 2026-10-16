export {};

// ===== Exercício 02: Cupom fiscal =====

const nomeDigitado: string = ' maria da silva ';

// Remove espaços das pontas (trim) e duplicados (split + filter + join),
// e capitaliza cada palavra, exceto "da", "de" e "do".
function formatarNome(nome: string): string {
  const minusculas: string[] = ['da', 'de', 'do'];

  return nome
    .trim()
    .split(' ')
    .filter((palavra) => palavra !== '')
    .map((palavra) => {
      const p = palavra.toLowerCase();
      if (minusculas.includes(p)) {
        return p;
      }
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(' ');
}

// Conversões: o leitor de código de barras entrega texto
const precoLido: number = Number('12.40');
const quantidadeLida: number = parseInt('3un', 10); // lê "3" e ignora "un"

const clienteFidelidade: boolean = true;
const numeroCupom: number = 42;

const subtotal: number = precoLido * quantidadeLida;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const total: number = subtotal - desconto;

// Uma única template string de várias linhas
const cupom: string = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidadeLida} x R$ ${precoLido.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
