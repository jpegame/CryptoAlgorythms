export type Language = "Português" | "Inglês";

export interface CaesarCandidate {
    shift: number;
    plaintext: string;
    language: Language;
    score: number;
}

export interface CaesarAttackResult {
    best: CaesarCandidate;
    confidence: "Baixa" | "Média" | "Alta";
    candidates: CaesarCandidate[];
}

interface LanguageModel {
    language: Language;
    frequencies: readonly number[];
    words: ReadonlySet<string>;
}

const PORTUGUESE_FREQUENCIES = [14.63, 1.04, 3.88, 4.96, 12.57, 1.02, 1.30, 1.28, 6.18, 0.40, 0.02, 2.78, 4.74, 5.05, 10.73, 2.52, 1.20, 6.53, 7.81, 4.34, 4.63, 1.67, 0.01, 0.21, 0.01, 0.47] as const;
const ENGLISH_FREQUENCIES = [8.17, 1.49, 2.78, 4.25, 12.70, 2.23, 2.02, 6.09, 6.97, 0.15, 0.77, 4.03, 2.41, 6.75, 7.51, 1.93, 0.10, 5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.07] as const;

const PORTUGUESE_WORDS = new Set(`a ao aos aquela aquelas aquele aqueles aquilo aqui as assim ate bem boa bom cada coisa com como contra da das de dela deles depois do dos e ela elas ele eles em entao entre era essa essas esse esses esta estamos este estou eu fazer faz foi for foram ha isso isto ja lhe lhes mais mas me mensagem mensagens mesmo meu minha meus minhas muito na nao nas nem no nos nossa nossas nosso nossos num numa o oi os ou outra outras outro outros para pela pelas pelo pelos pessoa pode por porque qual quando que quem se sem ser seu seus so sou sua suas tambem te tem tenho ter teu teus tu um uma umas uns vai voce voces cifra cifras cesar criptografia criptografar criptografada texto textos teste testar simples segredo chave original seguranca informacao atividade pedro`.split(" "));
const ENGLISH_WORDS = new Set(`a about after again all also am an and any are as at away back be because been before being between both but by came can come could day did do does down each even every few find first for from get give go good had has have he her here him his how i if in into is it its just key know like little long look made make man many may me message messages more most much must my name new no not now of off old on once one only or other our out over people plaintext said same see she should so some take than that the their them then there these they thing think this those through time to two up use very want was way we well were what when where which who will with work world would year you your hello pedro cipher ciphers encryption encrypted decrypt decrypting secret`.split(" "));

const LANGUAGE_MODELS: readonly LanguageModel[] = [
    { language: "Português", frequencies: PORTUGUESE_FREQUENCIES, words: PORTUGUESE_WORDS },
    { language: "Inglês", frequencies: ENGLISH_FREQUENCIES, words: ENGLISH_WORDS }
];

function normalizeForScoring(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function decryptCandidate(cipherText: string, shift: number): string {
    return cipherText.replace(/[a-z]/gi, (character) => {
        const base = character >= "a" && character <= "z" ? 97 : 65;
        const position = character.charCodeAt(0) - base;
        return String.fromCharCode(((position - shift + 26) % 26) + base);
    });
}

function scoreForLanguage(text: string, model: LanguageModel): number {
    const normalized = normalizeForScoring(text);
    const letters = normalized.replace(/[^a-z]/g, "");
    if (letters.length === 0) return Number.NEGATIVE_INFINITY;

    const counts = new Array<number>(26).fill(0);
    for (const character of letters) counts[character.charCodeAt(0) - 97]++;

    let chiSquared = 0;
    for (let i = 0; i < 26; i++) {
        const expected = (model.frequencies[i] / 100) * letters.length;
        chiSquared += ((counts[i] - expected) ** 2) / expected;
    }

    const tokens = normalized.match(/[a-z]+/g) || [];
    const recognizedLetters = tokens.reduce(
        (total, token) => total + (model.words.has(token) ? token.length : 0),
        0
    );
    const wordCoverage = recognizedLetters / letters.length;

    // Word recognition carries more weight than frequencies, which are noisy in short messages.
    return wordCoverage * 100 - chiSquared / letters.length;
}

function getConfidence(best: CaesarCandidate, runnerUp?: CaesarCandidate): CaesarAttackResult["confidence"] {
    const letters = normalizeForScoring(best.plaintext).replace(/[^a-z]/g, "").length;
    const tokens = normalizeForScoring(best.plaintext).match(/[a-z]+/g) || [];
    const knownTokens = tokens.filter((token) => {
        const model = LANGUAGE_MODELS.find((candidate) => candidate.language === best.language)!;
        return model.words.has(token);
    }).length;
    const coverage = tokens.length ? knownTokens / tokens.length : 0;
    const margin = runnerUp ? best.score - runnerUp.score : Number.POSITIVE_INFINITY;

    if (letters >= 12 && coverage >= 0.65 && margin >= 12) return "Alta";
    if (coverage >= 0.35 && margin >= 4) return "Média";
    return "Baixa";
}

export function analyzeCaesarAttack(cipherText: string): CaesarAttackResult {
    if (typeof cipherText !== "string" || !cipherText.trim()) {
        throw new Error("Informe o texto cifrado.");
    }
    if (!/[a-z]/i.test(cipherText)) {
        throw new Error("O texto precisa conter ao menos uma letra do alfabeto A–Z.");
    }

    const candidates: CaesarCandidate[] = [];
    for (let shift = 1; shift <= 25; shift++) {
        const plaintext = decryptCandidate(cipherText, shift);
        const languageScores = LANGUAGE_MODELS.map((model) => ({
            model,
            score: scoreForLanguage(plaintext, model)
        }));
        const mostLikelyLanguage = languageScores.sort((a, b) => b.score - a.score)[0];
        candidates.push({
            shift,
            plaintext,
            language: mostLikelyLanguage.model.language,
            score: mostLikelyLanguage.score
        });
    }

    candidates.sort((a, b) => b.score - a.score);
    return {
        best: candidates[0],
        confidence: getConfidence(candidates[0], candidates[1]),
        candidates
    };
}
