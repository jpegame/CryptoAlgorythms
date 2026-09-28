export function otpEncrypt(
    text: string,
    customKey?: string
): { cipherTextHex: string; keyHex: string } {
    let keyBytes: number[] = [];

    if (customKey) {
        if (customKey.length !== text.length) {
            throw new Error("Para OTP, a chave deve ter exatamente o mesmo tamanho do texto.");
        }
        keyBytes = customKey.split("").map((c) => c.charCodeAt(0));
    } else {
        for (let i = 0; i < text.length; i++) {
            keyBytes.push(Math.floor(Math.random() * 256));
        }
    }

    const cipherHex: string[] = [];
    const keyHex: string[] = [];

    for (let i = 0; i < text.length; i++) {
        const textByte = text.charCodeAt(i);
        const keyByte = keyBytes[i];
        const cipherByte = textByte ^ keyByte;

        cipherHex.push(cipherByte.toString(16).padStart(2, "0"));
        keyHex.push(keyByte.toString(16).padStart(2, "0"));
    }

    return {
        cipherTextHex: cipherHex.join(""),
        keyHex: keyHex.join("")
    };
}

export function otpDecrypt(cipherTextHex: string, keyHex: string): string {
    if (cipherTextHex.length !== keyHex.length || cipherTextHex.length % 2 !== 0) {
        throw new Error("Hexadecimais inválidos ou de tamanhos incompatíveis.");
    }

    let result = "";
    for (let i = 0; i < cipherTextHex.length; i += 2) {
        const cipherByte = parseInt(cipherTextHex.substring(i, i + 2), 16);
        const keyByte = parseInt(keyHex.substring(i, i + 2), 16);

        if (isNaN(cipherByte) || isNaN(keyByte)) {
            throw new Error("Conteúdo hexadecimal inválido.");
        }

        result += String.fromCharCode(cipherByte ^ keyByte);
    }

    return result;
}