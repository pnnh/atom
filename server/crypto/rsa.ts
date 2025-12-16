import {constants, privateDecrypt, publicEncrypt} from 'crypto';

export async function nodeGenerateRsaKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const {generateKeyPair} = await import('crypto');
    return new Promise((resolve, reject) => {
        generateKeyPair(
            'rsa',
            {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                },
            },
            (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({publicKey, privateKey});
                }
            }
        );
    });
}

export async function nodeEncodeRsa(data: string, key: string): Promise<string> {
    try {
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = publicEncrypt(
            {
                key,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer
        );
        return encrypted.toString('base64');
    } catch (err) {
        throw new Error(`RSA encryption failed: ${(err as Error).message}`);
    }
}

export async function nodeDecodeRsa(encryptedData: string, key: string): Promise<string> {
    try {
        const buffer = Buffer.from(encryptedData, 'base64');
        const decrypted = privateDecrypt(
            {
                key,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer
        );
        return decrypted.toString('utf8');
    } catch (err) {
        throw new Error(`RSA decryption failed: ${(err as Error).message}`);
    }
}
