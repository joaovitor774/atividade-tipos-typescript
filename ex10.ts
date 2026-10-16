export {};

// ===== Exercício 10: Sistema de estacionamento (projeto integrador) =====

// ---------- Type aliases ----------
type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

// ---------- União discriminada ----------
type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

// ---------- Enum ----------
enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

// ---------- Ticket ----------
type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// ---------- Tarifa com verificação exaustiva ----------
function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais = Math.max(horas - 1, 0); // todo veículo paga ao menos 1 hora
  switch (v.tipo) {
    case 'carro':
      return 8 + adicionais * 5;
    case 'moto':
      return 4 + adicionais * 2;
    case 'caminhao':
      return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste do never: acrescente uma Van à união SEM tratá-la no switch:
//   type Van = { readonly placa: Placa; tipo: 'van' };
//   type Veiculo = Carro | Moto | Caminhao | Van;
// O compilador acusa no default:
//   error TS2322: Type 'Van' is not assignable to type 'never'.
// O que o never garantiu: a verificação exaustiva. Se alguém adiciona um tipo novo à
// união e esquece de tratá-lo no switch, o erro aparece em tempo de compilação (no
// default, `v` deixa de ser never), em vez de a tarifa quebrar silenciosamente em produção.

// ---------- Fechamento do ticket ----------
function calcularHoras(periodo: Periodo): number {
  const [entrada, saida] = periodo;
  return Math.max(saida - entrada, 1);
}

function fecharTicket(t: Ticket): Ticket {
  const horas = calcularHoras(t.periodo);
  const base = calcularTarifa(t.veiculo, horas);
  const valor = t.selo ? base * 0.5 : base;
  // novo objeto com spread: o ticket original não é alterado
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(t: Ticket): void {
  const horas = calcularHoras(t.periodo);
  const valor = (t.valor ?? 0).toFixed(2);
  const selo = t.selo ? ' (selo -50%)' : '';
  console.log(`[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horas}h - R$ ${valor}${selo}`);
}

// ---------- Entrada externa com unknown ----------
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
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
    return falhar('veículo deve ser um objeto');
  }
  if (!('placa' in dados) || typeof dados.placa !== 'string') {
    return falhar('campo "placa" inválido');
  }
  const placa: Placa = dados.placa;
  if (!('tipo' in dados)) {
    return falhar('campo "tipo" ausente');
  }

  switch (dados.tipo) {
    case 'carro': {
      if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
        return falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas: dados.portas };
    }
    case 'moto': {
      if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number') {
        return falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas: dados.cilindradas };
    }
    case 'caminhao': {
      if (!('eixos' in dados) || typeof dados.eixos !== 'number') {
        return falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos: dados.eixos };
    }
    default:
      return falhar(`tipo "${String(dados.tipo)}" desconhecido`);
  }
}

// ---------- Dados de teste (chegam da cancela como JSON) ----------
const entradas: { json: string; periodo: Periodo; selo: boolean }[] = [
  { json: '{"placa":"ABC1D23","tipo":"carro","portas":4}', periodo: [8, 11], selo: false },
  { json: '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', periodo: [9, 10], selo: false },
  { json: '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', periodo: [7, 12], selo: false },
  { json: '{"placa":"XYZ4E56","tipo":"carro","portas":2}', periodo: [14, 16], selo: true },
];

const abertos: Ticket[] = entradas.map((e) => ({
  veiculo: lerVeiculo(e.json),
  periodo: e.periodo,
  selo: e.selo,
  situacao: SituacaoTicket.Aberto,
}));

// ---------- Relatório ----------
const fechados: Ticket[] = abertos.map(fecharTicket);

// cada ticket fechado
fechados.filter((t) => t.situacao === SituacaoTicket.Pago).forEach(registrar);

// faturamento total
const faturamento: number = fechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

// quantos veículos de cada tipo entraram
type Contagem = { carro: number; moto: number; caminhao: number };
const entradasPorTipo: Contagem = abertos.reduce<Contagem>(
  (acc, t) => {
    acc[t.veiculo.tipo] += 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 },
);
console.log(
  `Entradas: carro=${entradasPorTipo.carro}, moto=${entradasPorTipo.moto}, caminhao=${entradasPorTipo.caminhao}`,
);

// veículo inválido
try {
  lerVeiculo('{"placa":"BIC1K00","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro ao ler veículo: ${erro.message}`);
  }
}
