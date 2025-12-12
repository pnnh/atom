import {base32hex, base64url} from 'rfc4648'
import {parse as uuidParse, v4 as uuidv4} from 'uuid';
import {base58, base58flickr, base58xmr, base58xrp, createBase58check,} from '@scure/base';
import md5 from "md5";
import {sha256} from "@noble/hashes/sha2.js";

/**
 * 将字符串转换为base64编码的字符串
 * @param state - 待编码的字符串
 * @returns base64编码的字符串
 */
export function encodeBase64String(state: string | unknown): string {
    if (typeof state !== 'string') {
        throw new Error(`encodeBase64String error: state must be a string, got ${typeof state}`);
    }
    try {
        const enc = new TextEncoder()
        return base64url.stringify(enc.encode(state))
    } catch (e) {
        throw new Error(`encodeBase64String encode error: ${state} : ${e}`);
    }
}

export function encodeBase32String(state: string | unknown): string {
    if (typeof state !== 'string') {
        throw new Error(`encodeBase32String error: state must be a string, got ${typeof state}`);
    }
    try {
        const enc = new TextEncoder()
        return base32hex.stringify(enc.encode(state))
    } catch (e) {
        throw new Error(`encodeBase32String encode error: ${state} : ${e}`);
    }
}

export function decodeBase32String(base32State: string): string {
    try {
        const stateData = base32hex.parse(base32State)
        const decoder = new TextDecoder()
        return decoder.decode(stateData)
    } catch (e) {
        throw new Error(`decodeBase32String decode error: ${base32State} : ${e}`);
    }
}

/**
 * 将base64编码的字符串转换为字符串
 * @param base64State - 待解码的base64编码的字符串
 * @returns 解码后的字符串
 */
export function decodeBase64String(base64State: string): string {
    try {
        const stateData = base64url.parse(base64State)
        const decoder = new TextDecoder()
        return decoder.decode(stateData)
    } catch (e) {
        throw new Error(`decodeBase64String decode error: ${base64State} : ${e}`);
    }
}

export function binaryToBase58String(data: Uint8Array): string {
    try {
        return base58xrp.encode(data)
    } catch (e) {
        throw new Error(`binaryToBase58String encode error: ${data} : ${e}`);
    }
}

export function generateUuid(): string {
    return uuidv4();
}

export function generateUuidV7(): string {
    return uuidv4();
}

// Deprecated: Use `isValidUuid` instead
export function stringToUuid(uuidString: string) {
    try {
        return uuidParse(uuidString).toString();
    } catch (e) {
        throw new Error(`stringToUuid Invalid UUID string: ${uuidString}`);
    }
}

// Check if a string is a valid UUID
export function isValidUuid(uuidString: string): boolean {
    try {
        stringToUuid(uuidString);
        return true;
    } catch (e) {
        // console.warn(`isValidUuid Invalid UUID string: ${uuidString}`, e);
        return false;
    }
}

export function uuidToBase58(uuidString: string) {
    try {
        const data = uuidParse(uuidString);
        // 需要和服务器上的实现保持一致
        return base58xrp.encode(data);
    } catch (e) {
        throw new Error(`uuidToBase58 Invalid UUID string -> ${uuidString} -> ${e}`);
    }
}

function byteArrayToUUID(byteArray: Uint8Array) {
    if (byteArray.length !== 16) {
        throw new Error("Byte array must be exactly 16 bytes long to form a UUID.");
    }

    // Convert each byte to a two-digit hexadecimal string
    let hex = Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');

    // Insert hyphens at the correct positions to form a UUID string
    return [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20)
    ].join('-');
}

export function tryBase58ToUuid(base58String: string): string | undefined {
    try {
        return mustBase58ToUuid(base58String);
    } catch (e) {
        console.warn(`base58ToUuid Invalid base58 string: ${base58String}`, e);
        return undefined; // 或者抛出错误
    }
}

export function mustBase58ToUuid(base58String: string): string {
    try {
        const data = base58xrp.decode(base58String);
        if (data) {
            return byteArrayToUUID(data);
        }
    } catch (e) {
        throw new Error(`mustBase58ToUuid decode error: ${base58String} : ${e}`);
    }
    throw new Error(`mustBase58ToUuid Invalid base58 string: ${base58String}`);
}

export function stringToBase58(data: string, flavor: string = 'xrp'): string {
    try {
        const enc = new TextEncoder()
        const dataBytes = enc.encode(data)
        switch (flavor) {
            case 'xrp':
                return base58xrp.encode(dataBytes)
            case 'xmr':
                return base58xmr.encode(dataBytes)
            case 'flickr':
                return base58flickr.encode(dataBytes)
            case 'check':
                const coder = createBase58check(sha256)
                return coder.encode(dataBytes)
        }
        return base58.encode(dataBytes)
    } catch (e) {
        throw new Error(`stringToBase58 encode error: ${data} : ${e}`);
    }
}

export function encodeBase58String(state: string): string {
    return stringToBase58(state, 'xrp')
}

export function decodeBase58String(base58State: string): string {
    return base58ToString(base58State)
}

export function base58ToString(data: string, flavor: string = 'xrp'): string {
    try {
        let decoded: Uint8Array
        switch (flavor) {
            case 'xrp':
                decoded = base58xrp.decode(data)
                break
            case 'xmr':
                decoded = base58xmr.decode(data)
                break
            case 'flickr':
                decoded = base58flickr.decode(data)
                break
            case 'check':
                const coder = createBase58check(sha256)
                decoded = coder.decode(data)
                break
            default:
                decoded = base58.decode(data)
        }
        const dec = new TextDecoder()
        return dec.decode(decoded)
    } catch (e) {
        throw new Error(`base58ToString decode error: ${data} : ${e}`);
    }
}

/**
 * 将字符串转换为md5字符串
 * @param data - 待转换的字符串
 * @returns md5字符串
 */
export function stringToMd5(data: string): string {
    try {
        return md5(data)
    } catch (e) {
        throw new Error(`stringToMd5 encode error: ${data} : ${e}`);
    }
}
