function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(a: number, m: number = 26): number | null {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}

function validateMatrix2x2(matrix: number[][]): { det: number; detInv: number } {
    if (!matrix || matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
        throw new Error("A chave da Cifra de Hill precisa ser uma matriz 2x2 de números.");
    }

    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];

    const det = ((a * d - b * c) % 26 + 26) % 26;
    const detInv = modInverse(det, 26);

    if (detInv === null || gcd(det, 26) !== 1) {
        throw new Error(`Matriz inválida: o determinante (${det}) não é coprimo de 26.`);
    }

    return { det, detInv };
}

export function hillEncrypt(text: string, keyMatrix: number[][]): string {
    validateMatrix2x2(keyMatrix);

    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleanText.length === 0) {
        throw new Error("O texto precisa conter ao menos uma letra.");
    }

    let paddedText = cleanText;
    if (paddedText.length % 2 !== 0) {
        paddedText += "X";
    }

    let result = "";
    for (let i = 0; i < paddedText.length; i += 2) {
        const p1 = paddedText.charCodeAt(i) - 65;
        const p2 = paddedText.charCodeAt(i + 1) - 65;

        const c1 = (keyMatrix[0][0] * p1 + keyMatrix[0][1] * p2) % 26;
        const c2 = (keyMatrix[1][0] * p1 + keyMatrix[1][1] * p2) % 26;

        result += String.fromCharCode(((c1 % 26) + 26) % 26 + 65);
        result += String.fromCharCode(((c2 % 26) + 26) % 26 + 65);
    }

    return result;
}

export function hillDecrypt(cipherText: string, keyMatrix: number[][]): string {
    const { detInv } = validateMatrix2x2(keyMatrix);

    const cleanText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleanText.length % 2 !== 0) {
        throw new Error("Texto cifrado inválido para bloco de tamanho 2.");
    }

    const a = keyMatrix[0][0];
    const b = keyMatrix[0][1];
    const c = keyMatrix[1][0];
    const d = keyMatrix[1][1];

    const invK = [
        [((d * detInv) % 26 + 26) % 26, (((-b % 26) + 26) * detInv) % 26],
        [(((-c % 26) + 26) * detInv) % 26, ((a * detInv) % 26 + 26) % 26]
    ];

    let result = "";
    for (let i = 0; i < cleanText.length; i += 2) {
        const c1 = cleanText.charCodeAt(i) - 65;
        const c2 = cleanText.charCodeAt(i + 1) - 65;

        const p1 = (invK[0][0] * c1 + invK[0][1] * c2) % 26;
        const p2 = (invK[1][0] * c1 + invK[1][1] * c2) % 26;

        result += String.fromCharCode(((p1 % 26) + 26) % 26 + 65);
        result += String.fromCharCode(((p2 % 26) + 26) % 26 + 65);
    }

    return result;
}