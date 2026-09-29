function validateBytes(values: number[], label: string): void {
    if (!Array.isArray(values) || values.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
        throw new Error(`${label} deve ser uma lista de inteiros entre 0 e 255.`);
    }
}

export function otpEncrypt(message: number[], customKey?: number[]): {
    cipherText: number[]; key: number[]; cipherTextHex: string; keyHex: string;
} {
    validateBytes(message, "A mensagem");
    if (message.length === 0) throw new Error("Informe ao menos um byte para a mensagem.");

    let key: number[];
    if (customKey !== undefined) {
        validateBytes(customKey, "A chave");
        if (customKey.length !== message.length) {
            throw new Error("Para OTP, a chave deve ter exatamente a mesma quantidade de bytes da mensagem.");
        }
        key = customKey;
    } else {
        const random = new Uint8Array(message.length);
        for (let offset = 0; offset < random.length; offset += 65_536) {
            globalThis.crypto.getRandomValues(random.subarray(offset, Math.min(offset + 65_536, random.length)));
        }
        key = Array.from(random);
    }

    const cipherText = message.map((byte, i) => byte ^ key[i]);
    const toHex = (bytes: number[]) => bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    return { cipherText, key, cipherTextHex: toHex(cipherText), keyHex: toHex(key) };
}

export function otpDecrypt(cipherText: number[], key: number[]): number[] {
    validateBytes(cipherText, "O texto cifrado");
    validateBytes(key, "A chave");
    if (cipherText.length === 0 || cipherText.length !== key.length) {
        throw new Error("Texto cifrado e chave devem ter a mesma quantidade de bytes, maior que zero.");
    }
    return cipherText.map((byte, i) => byte ^ key[i]);
}
