import '@testing-library/jest-dom'
import {
    base58ToUuid,
    encodeBase58String,
    decodeBase58String,
    uuidToBase58,
    stringToMd5, mustBase58ToUuid, isValidUuid,
} from './basex';

export function commonBasexTests(envName: string) {
    describe(`${envName} basex tests`, () => {
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
            const uuid = base58ToUuid(base58);

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
}

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

commonBasexTests('node');