export function vigenereEncrypt(text: string, key: string): string {
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleanKey.length === 0) throw new Error("A chave precisa conter letras.");

    let keyIndex = 0;
    return text
        .split("")
        .map((char) => {
            const code = char.charCodeAt(0);
            const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;

            if (code >= 65 && code <= 90) {
                keyIndex++;
                return String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
            if (code >= 97 && code <= 122) {
                keyIndex++;
                return String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
            return char;
        })
        .join("");
}

export function vigenereDecrypt(text: string, key: string): string {
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleanKey.length === 0) throw new Error("A chave precisa conter letras.");

    let keyIndex = 0;
    return text
        .split("")
        .map((char) => {
            const code = char.charCodeAt(0);
            const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;

            if (code >= 65 && code <= 90) {
                keyIndex++;
                return String.fromCharCode((((code - 65 - shift) % 26) + 26) % 26 + 65);
            }
            if (code >= 97 && code <= 122) {
                keyIndex++;
                return String.fromCharCode((((code - 97 - shift) % 26) + 26) % 26 + 97);
            }
            return char;
        })
        .join("");
}