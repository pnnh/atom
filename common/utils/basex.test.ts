import '@testing-library/jest-dom'
import {
    encodeBase64String,
    encodeBase32String,
    decodeBase64String,
    tryBase58ToUuid,
    encodeBase58String,
    decodeBase58String,
    uuidToBase58,
    stringToMd5, mustBase58ToUuid, isValidUuid,
} from './basex';

describe('encodeBase64String', () => {
    test('should encode a regular string to base64', () => {
        const input = 'hello world';
        const expected = 'aGVsbG8gd29ybGQ=';
        expect(encodeBase64String(input)).toBe(expected);
    });

    test('should encode an empty string', () => {
        expect(encodeBase64String('')).toBe('');
    });

    test('should throw error for non-string input (number)', () => {
        expect(() => encodeBase64String(123)).toThrow(/must be a string/);
    });

    test('should throw error for non-string input (object)', () => {
        expect(() => encodeBase64String({})).toThrow(/must be a string/);
    });
});

describe('decodeBase64String', () => {
    test('should decode a valid base64 string', () => {
        const input = 'aGVsbG8gd29ybGQ=';
        const expected = 'hello world';
        expect(decodeBase64String(input)).toBe(expected);
    });

    test('should decode an empty string', () => {
        expect(decodeBase64String('')).toBe('');
    });

    test('should throw error for invalid base64 string', () => {
        expect(() => decodeBase64String('invalid_base64')).toThrow(/decode error/);
    });
});

describe('encodeBase32String', () => {
    test('should encode a regular string to base32', () => {
        const input = 'hello world';
        // base32hex encoding of 'hello world'
        const expected = 'D1IMOR3F41RMUSJCCG======';
        expect(encodeBase32String(input)).toBe(expected);
    });

    test('should encode an empty string', () => {
        expect(encodeBase32String('')).toBe('');
    });

    test('should throw error for non-string input (number)', () => {
        expect(() => encodeBase32String(123)).toThrow(/must be a string/);
    });

    test('should throw error for non-string input (object)', () => {
        expect(() => encodeBase32String({})).toThrow(/must be a string/);
    });
});

describe(`basex tests`, () => {
    test('isValidUuid', () => {
        const validUuid = '01982730-dfa9-73e3-a115-67c3671f6038';
        const invalidUuid = 'invalid-uuid-string';
        expect(isValidUuid(validUuid)).toBe(true);
        expect(isValidUuid(invalidUuid)).toBe(false);
    });

    test('uuidToBase58', () => {
        const uuid = '01982730-dfa9-73e3-a115-67c3671f6038';
        const expectedBase58 = 'URJsXTaZbuQrcYtP7CHAV';
        const base58 = uuidToBase58(uuid);

        expect(base58).toBe(expectedBase58);
    });
    test('base58ToUuid', () => {
        const base58 = 'URJsXTaZbuQrcYtP7CHAV';
        const expectedUuid = '01982730-dfa9-73e3-a115-67c3671f6038';
        const uuid = tryBase58ToUuid(base58);

        expect(uuid).toBe(expectedUuid);
    });


    test('base58ToUuid with invalid input', () => {
        let error;
        try {
            mustBase58ToUuid('invalidbase58');
        } catch (e) {
            error = e;
        }
        expect(error).toBeTruthy()
    });

    test('stringToBase58', testStringToBase58);
    test('base58ToString', testBase58ToString);

    test('encodeBase58String', testEncodeBase58String);
    test('decodeBase58String', testDecodeBase58String);

    test('testStringToMd5', testStringToMd5);
});


export function testStringToBase58() {
    const str = 'hello world';
    const val = 'StVrDLaUATiyKyV'
    const encoded = encodeBase58String(str);
    expect(encoded).toBe(val);
}

export function testBase58ToString() {
    const str = 'StVrDLaUATiyKyV';
    const decoded = decodeBase58String(str);
    expect(decoded).toBe('hello world');
}

export function testEncodeBase58String() {
    const str = 'hello world';
    const val = 'StVrDLaUATiyKyV'
    const encoded = encodeBase58String(str);
    expect(encoded).toBe(val);
}

export function testDecodeBase58String() {
    const str = 'StVrDLaUATiyKyV';
    const decoded = decodeBase58String(str);
    expect(decoded).toBe('hello world');
}

export function testStringToMd5() {
    const str = 'hello world';
    const hash = '5eb63bbbe01eeed093cb22bb8f5acdc3'
    const md5 = stringToMd5(str);
    expect(md5).toEqual(hash)

}
