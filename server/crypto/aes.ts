export async function nodeGenerateAesKey(): Promise<string> {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
}

export async function nodeEncodeAes(data: string, key: string): Promise<string> {
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(key, 'salt', 32), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export async function nodeDecodeAes(encryptedData: string, key: string): Promise<string> {
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts.shift() || '', 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(algorithm, crypto.scryptSync(key, 'salt', 32), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
