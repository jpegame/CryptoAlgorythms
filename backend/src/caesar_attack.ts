import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const FREQ_PORTUGUES: Record<string, number> = {
  A: 14.63, B: 1.04, C: 3.88, D: 4.96, E: 12.57, F: 1.02, G: 1.30,
  H: 1.28,  I: 6.18, J: 0.40, K: 0.02, L: 2.78,  M: 4.74, N: 5.05,
  O: 10.73, P: 2.52, Q: 1.20, R: 6.53, S: 7.81,  T: 4.34, U: 4.63,
  V: 1.67,  W: 0.01, X: 0.21, Y: 0.01, Z: 0.47
};

function decifraCesar(textoCifrado: string, deslocamento: number): string {
  return textoCifrado.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    const code = char.charCodeAt(0) - base;
    const decifrado = (code - deslocamento + 26) % 26;
    return String.fromCharCode(decifrado + base);
  });
}

function calcularPontuacaoFrequencia(texto: string): number {
  const textoLimpo = texto.toUpperCase().replace(/[^A-Z]/g, '');
  if (textoLimpo.length === 0) return -Infinity;

  const contagem: Record<string, number> = {};
  for (const char of textoLimpo) {
    contagem[char] = (contagem[char] || 0) + 1;
  }

  let pontuacao = 0;
  for (const char in contagem) {
    const freqObservada = (contagem[char] / textoLimpo.length) * 100;
    const freqEsperada = FREQ_PORTUGUES[char] || 0;
    pontuacao -= Math.abs(freqObservada - freqEsperada);
  }

  return pontuacao;
}

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("=================================================");
    console.log("   CIFRA DE CÉSAR   ");
    console.log("=================================================\n");
    console.log("Ex: Yjajknwb ynuj jyanbnwcjljx - Cjamnuur\n");

    const textoCifrado = await rl.question("Digite o texto cifrado: ");

    if (!textoCifrado.trim()) {
      console.log("Texto inválido.");
      return;
    }

    interface Resultado {
      deslocamento: number;
      textoClaro: string;
      pontuacao: number;
    }

    const resultados: Resultado[] = [];

    for (let shift = 1; shift < 26; shift++) {
      const candidato = decifraCesar(textoCifrado, shift);
      const score = calcularPontuacaoFrequencia(candidato);
      resultados.push({ deslocamento: shift, textoClaro: candidato, pontuacao: score });
    }

    console.log("\n--- POSSIBILIDADES ---");
    resultados.forEach(res => {
      console.log(`Chave ${res.deslocamento.toString().padStart(2, '0')}: ${res.textoClaro}`);
    });

    resultados.sort((a, b) => b.pontuacao - a.pontuacao);
    const maisProvavel = resultados[0];

    console.log("\n=================================================");
    console.log("   ANÁLISE DE FREQUÊNCIA   ");
    console.log("=================================================");
    console.log(`Chave Mais Provável : ${maisProvavel.deslocamento}`);
    console.log(`Texto Decifrado     : ${maisProvavel.textoClaro}`);
    console.log("=================================================\n");
  } finally {
    rl.close();
  }
}

main();