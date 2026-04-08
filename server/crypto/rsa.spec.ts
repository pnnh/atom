import {describe, expect, test} from 'vitest'
import {
    nodeDecodeRsa,
    nodeEncodeRsa,
    nodeGenerateRsaKeyPair,
    nodeSignRsa,
    nodeVerifyRsa,
} from './rsa'

describe('nodeGenerateRsaKeyPair', () => {
    test('should generate a key pair with publicKey and privateKey', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        expect(publicKey).toContain('-----BEGIN PUBLIC KEY-----')
        expect(privateKey).toContain('-----BEGIN PRIVATE KEY-----')
    })

    test('generated keys should be non-empty strings', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        expect(typeof publicKey).toBe('string')
        expect(typeof privateKey).toBe('string')
        expect(publicKey.length).toBeGreaterThan(0)
        expect(privateKey.length).toBeGreaterThan(0)
    })
})

describe('nodeEncodeRsa / nodeDecodeRsa', () => {
    test('should encrypt and decrypt a plain text correctly', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        const plaintext = 'hello world'
        const encrypted = await nodeEncodeRsa(plaintext, publicKey)
        const decrypted = await nodeDecodeRsa(encrypted, privateKey)
        expect(decrypted).toBe(plaintext)
    })

    test('encrypted output should be a valid base64 string', async () => {
        const {publicKey} = await nodeGenerateRsaKeyPair()
        const encrypted = await nodeEncodeRsa('test data', publicKey)
        const base64Regex = /^[A-Za-z0-9+/]+=*$/
        expect(base64Regex.test(encrypted)).toBe(true)
    })

    test('should throw when encrypting with an invalid key', async () => {
        await expect(nodeEncodeRsa('data', 'invalid-key')).rejects.toThrow('RSA encryption failed')
    })

    test('should throw when decrypting with wrong private key', async () => {
        const {publicKey} = await nodeGenerateRsaKeyPair()
        const {privateKey: wrongPrivateKey} = await nodeGenerateRsaKeyPair()
        const encrypted = await nodeEncodeRsa('secret', publicKey)
        await expect(nodeDecodeRsa(encrypted, wrongPrivateKey)).rejects.toThrow('RSA decryption failed')
    })

    test('should throw when decrypting with an invalid key', async () => {
        await expect(nodeDecodeRsa('aGVsbG8=', 'invalid-key')).rejects.toThrow('RSA decryption failed')
    })
})

describe('nodeSignRsa / nodeVerifyRsa', () => {
    test('should sign data and verify the signature successfully', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        const data = 'message to sign'
        const signature = await nodeSignRsa(data, privateKey)
        const isValid = await nodeVerifyRsa(data, signature, publicKey)
        expect(isValid).toBe(true)
    })

    test('signature should be a non-empty base64 string', async () => {
        const {privateKey} = await nodeGenerateRsaKeyPair()
        const signature = await nodeSignRsa('some data', privateKey)
        const base64Regex = /^[A-Za-z0-9+/]+=*$/
        expect(base64Regex.test(signature)).toBe(true)
        expect(signature.length).toBeGreaterThan(0)
    })

    test('verification should fail when data is tampered', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        const signature = await nodeSignRsa('original message', privateKey)
        const isValid = await nodeVerifyRsa('tampered message', signature, publicKey)
        expect(isValid).toBe(false)
    })

    test('verification should fail when signature is wrong', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        const signature = await nodeSignRsa('message', privateKey)
        const tamperedSignature = signature.split('').reverse().join('')
        const isValid = await nodeVerifyRsa('message', tamperedSignature, publicKey)
        expect(isValid).toBe(false)
    })

    test('verification should fail when using a different public key', async () => {
        const {privateKey} = await nodeGenerateRsaKeyPair()
        const {publicKey: otherPublicKey} = await nodeGenerateRsaKeyPair()
        const signature = await nodeSignRsa('message', privateKey)
        const isValid = await nodeVerifyRsa('message', signature, otherPublicKey)
        expect(isValid).toBe(false)
    })

    test('should support SHA512 algorithm', async () => {
        const {publicKey, privateKey} = await nodeGenerateRsaKeyPair()
        const data = 'sha512 test'
        const signature = await nodeSignRsa(data, privateKey, 'SHA512')
        const isValid = await nodeVerifyRsa(data, signature, publicKey, 'SHA512')
        expect(isValid).toBe(true)
    })

    test('should throw when signing with an invalid private key', async () => {
        await expect(nodeSignRsa('data', 'invalid-key')).rejects.toThrow('RSA signing failed')
    })

    test('should throw when verifying with an invalid public key', async () => {
        const {privateKey} = await nodeGenerateRsaKeyPair()
        const signature = await nodeSignRsa('data', privateKey)
        await expect(nodeVerifyRsa('data', signature, 'invalid-key')).rejects.toThrow('RSA verification failed')
    })
})

