import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import md5 from 'crypto-js/md5';

export function encodeSHA256(data: string) {
    return sha256(data).toString();
}

export function encodeSHA512(data: string) {
    return sha512(data).toString();
}

export function encodeMD5(data: string) {
    return md5(data).toString();
}
