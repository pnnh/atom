import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import {visualizer} from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import preserveDirectives from 'rollup-preserve-directives'
import pkg from './package.json' with {type: 'json'}
import sass from 'rollup-plugin-sass';
import alias from "@rollup/plugin-alias";
import replace from '@rollup/plugin-replace'
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commonPlugins = [
    commonjs(),
    nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectories: ['node_modules', 'src'],
        preferBuiltins: false
    }),
    json(),
    alias({
        entries: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
        ]
    }),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15,
        '__PACKAGE_NAME__': pkg.name
    }),
    typescript({
        tsconfig: 'tsconfig.json',
        sourceMap: true,
    }),
    sass({
        output: 'lib/assets/index.css',
    }),
    terser()
]
const commonExternal = [
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
    ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : [])
]

let commonConfig = [{
    strictDeprecations: true,
    input: 'src/index.common.tsx',
    output: {
        file: 'lib/index.common.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: [del({targets: 'lib/*'}), ...commonPlugins]
},
    {
        input: 'src/index.common.tsx',
        output: {
            file: 'lib/index.common.cjs',
            format: 'cjs',
            sourcemap: true,
            assetFileNames: '[name][extname]'
        },
        external: commonExternal,
        plugins: commonPlugins
    }
]

export default commonConfig
