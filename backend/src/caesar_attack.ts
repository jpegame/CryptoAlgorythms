import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { analyzeCaesarAttack } from "./cipher/caesarAttack";

async function main(): Promise<void> {
    const rl = readline.createInterface({ input, output });

    try {
        console.log("=================================================");
        console.log("   ATAQUE À CIFRA DE CÉSAR");
        console.log("=================================================\n");

        const cipherText = await rl.question("Digite o texto cifrado: ");
        const result = analyzeCaesarAttack(cipherText);

        console.log("\n--- 25 POSSIBILIDADES ---");
        for (const candidate of [...result.candidates].sort((a, b) => a.shift - b.shift)) {
            console.log(
                `Chave ${candidate.shift.toString().padStart(2, "0")}: ${candidate.plaintext} ` +
                `(${candidate.language}, pontuação ${candidate.score.toFixed(1)})`
            );
        }

        console.log("\n=================================================");
        console.log(`Sugestão: chave ${result.best.shift} (${result.best.language})`);
        console.log(`Texto: ${result.best.plaintext}`);
        console.log(`Confiança: ${result.confidence}`);
        console.log("=================================================\n");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível analisar o texto.";
        console.error(`Erro: ${message}`);
        process.exitCode = 1;
    } finally {
        rl.close();
    }
}

void main();
