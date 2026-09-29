import { Router, Request, Response } from "express";
import { caesarEncrypt, caesarDecrypt } from "../cipher/caesar";
import { vigenereEncrypt, vigenereDecrypt } from "../cipher/vigenere";
import { otpEncrypt, otpDecrypt } from "../cipher/otp";
import { hillEncrypt, hillDecrypt } from "../cipher/hill";
import { analyzeCaesarAttack } from "../cipher/caesarAttack";

const router = Router();

router.post("/caesar/attack", (req: Request, res: Response) => {
    try {
        const result = analyzeCaesarAttack(req.body?.text);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// --- César ---
router.post("/caesar/encrypt", (req: Request, res: Response) => {
    try {
        const { text, shift } = req.body;
        const result = caesarEncrypt(text, Number(shift));
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/caesar/decrypt", (req: Request, res: Response) => {
    try {
        const { text, shift } = req.body;
        const result = caesarDecrypt(text, Number(shift));
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// --- Vigenère ---
router.post("/vigenere/encrypt", (req: Request, res: Response) => {
    try {
        const { text, key } = req.body;
        const result = vigenereEncrypt(text, key);
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/vigenere/decrypt", (req: Request, res: Response) => {
    try {
        const { text, key } = req.body;
        const result = vigenereDecrypt(text, key);
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// --- OTP ---
router.post("/otp/encrypt", (req: Request, res: Response) => {
    try {
        const { message, key } = req.body;
        const output = otpEncrypt(message, key);
        res.json(output);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/otp/decrypt", (req: Request, res: Response) => {
    try {
        const { cipherText, key } = req.body;
        const result = otpDecrypt(cipherText, key);
        res.json({ result, resultText: new TextDecoder("utf-8").decode(new Uint8Array(result)) });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// --- Hill ---
router.post("/hill/encrypt", (req: Request, res: Response) => {
    try {
        const { text, keyMatrix } = req.body;
        const result = hillEncrypt(text, keyMatrix);
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/hill/decrypt", (req: Request, res: Response) => {
    try {
        const { text, keyMatrix } = req.body;
        const result = hillDecrypt(text, keyMatrix);
        res.json({ result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
