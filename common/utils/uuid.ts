import {
    NIL, v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5,
    v6 as uuidv6, v7 as uuidv7, validate
} from 'uuid';

export function uuidV1() {
    return uuidv1()
}

export function isValidUUID(uuid: string) {
    return validate(uuid)
}

export function uuidV4() {
    return uuidv4()
}

export function uuidV6() {
    return uuidv6()
}

export function uuidV7() {
    return uuidv7()
}

export const EmptyUUID = NIL;

export function isEmptyUUID(uuid: string) {
    if (!uuid) {
        return true;
    }
    uuid = uuid.trim()
    return uuid === EmptyUUID || uuid === '' || uuid === '00000000-0000-0000-0000-000000000000';
}
