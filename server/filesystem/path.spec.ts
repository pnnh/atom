/** @jest-environment jsdom */

import '@testing-library/jest-dom'
import {resolvePath} from "@/atom/server/filesystem/path";

describe('file path', () => {
    it('resolve path', () => {
        const resolvedPath = resolvePath('~/test.txt');
        const regex = /^([C-Z]:)|\//;
        const isAbsolutePath = regex.test(resolvedPath);
        expect(isAbsolutePath).toBeTruthy();
    })
})