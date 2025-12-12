import {expect, test} from 'vitest'
import {resolvePath} from "./path";

test('resolve path', () => {
    const resolvedPath = resolvePath('~/test.txt');
    const regex = /^([C-Z]:)|\//;
    const isAbsolutePath = regex.test(resolvedPath);
    expect(isAbsolutePath).toBeTruthy();
})
