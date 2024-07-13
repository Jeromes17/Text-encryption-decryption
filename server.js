const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; 

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedText) {
    try {
        let textParts = encryptedText.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedData = Buffer.from(textParts.join(':'), 'hex');

        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);

        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error('Decryption failed');
    }
}

app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    try {
        const encryptedText = encrypt(text);
        res.json({ encryptedText });
    } catch (error) {
        console.error("Encryption error:", error);
        res.status(500).json({ error: "Encryption failed" });
    }
});

app.post('/decrypt', (req, res) => {
    const { encryptedText } = req.body;
    if (!encryptedText) {
        return res.status(400).json({ error: "Encrypted text is required" });
    }
    try {
        const decryptedText = decrypt(encryptedText);
        res.json({ decryptedText });
    } catch (error) {
        console.error("Decryption error:", error);
        res.status(500).json({ error: "Decryption failed" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
