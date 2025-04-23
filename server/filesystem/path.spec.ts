import {test, expect} from '@playwright/test';
import {resolvePath} from "@/atom/server/filesystem/path";

test('resolvePath', async ({page}) => {
    const resolvedPath = resolvePath('~/test.txt');

    console.debug('resolvedPath', resolvedPath);

    const isAbsolutePath = resolvedPath.startsWith('/')
    expect(isAbsolutePath).toBeTruthy();
});
