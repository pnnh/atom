import {describe, expect, test} from 'vitest'
import {nodeDecodeAes, nodeEncodeAes, nodeGenerateAesKey} from './aes'

describe('nodeGenerateAesKey', () => {
    test('should return a 64-character hex string (32 bytes)', async () => {
        const key = await nodeGenerateAesKey()
        expect(typeof key).toBe('string')
        expect(key).toHaveLength(64)
        expect(/^[0-9a-f]+$/.test(key)).toBe(true)
    })

    test('should generate different keys each time', async () => {
        const key1 = await nodeGenerateAesKey()
        const key2 = await nodeGenerateAesKey()
        expect(key1).not.toBe(key2)
    })
})

describe('nodeEncodeAes / nodeDecodeAes', () => {
    test('should encrypt and decrypt plain text correctly', async () => {
        const key = await nodeGenerateAesKey()
        const plaintext = 'hello world'
        const encrypted = await nodeEncodeAes(plaintext, key)
        const decrypted = await nodeDecodeAes(encrypted, key)
        expect(decrypted).toBe(plaintext)
    })

    test('should encrypt and decrypt an empty string', async () => {
        const key = await nodeGenerateAesKey()
        const encrypted = await nodeEncodeAes('', key)
        const decrypted = await nodeDecodeAes(encrypted, key)
        expect(decrypted).toBe('')
    })

    test('should encrypt and decrypt a long string', async () => {
        const key = await nodeGenerateAesKey()
        const plaintext = 'a'.repeat(10000)
        const encrypted = await nodeEncodeAes(plaintext, key)
        const decrypted = await nodeDecodeAes(encrypted, key)
        expect(decrypted).toBe(plaintext)
    })

    test('should encrypt and decrypt unicode characters', async () => {
        const key = await nodeGenerateAesKey()
        const plaintext = '你好，世界！🌍'
        const encrypted = await nodeEncodeAes(plaintext, key)
        const decrypted = await nodeDecodeAes(encrypted, key)
        expect(decrypted).toBe(plaintext)
    })

    test('encrypted output should contain IV separator and be different from plaintext', async () => {
        const key = await nodeGenerateAesKey()
        const plaintext = 'secret data'
        const encrypted = await nodeEncodeAes(plaintext, key)
        expect(encrypted).toContain(':')
        expect(encrypted).not.toBe(plaintext)
    })

    test('same plaintext encrypted twice should produce different ciphertext (random IV)', async () => {
        const key = await nodeGenerateAesKey()
        const plaintext = 'same message'
        const encrypted1 = await nodeEncodeAes(plaintext, key)
        const encrypted2 = await nodeEncodeAes(plaintext, key)
        expect(encrypted1).not.toBe(encrypted2)
    })

    test('should throw when decrypting with a wrong key', async () => {
        const key1 = await nodeGenerateAesKey()
        const key2 = await nodeGenerateAesKey()
        const encrypted = await nodeEncodeAes('secret', key1)
        await expect(nodeDecodeAes(encrypted, key2)).rejects.toThrow()
    })

    test('should throw when decrypting invalid ciphertext', async () => {
        const key = await nodeGenerateAesKey()
        await expect(nodeDecodeAes('invaliddata', key)).rejects.toThrow()
    })
})

