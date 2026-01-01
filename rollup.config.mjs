import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json";
import dts from 'rollup-plugin-dts';
import css from "rollup-plugin-import-css";

export default [{
    input: 'client/index.tsx',
    output: [{
        file: 'dist/client.mjs',
        format: 'es',
        sourcemap: true,
        exports: 'auto' // 自动处理模块导出
    }, {
        file: 'dist/client.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'auto' // 自动处理模块导出
    }],
    external: [], // 确保不将任何依赖视为外部模块
    plugins: [
        nodeResolve({
            preferBuiltins: true
        }),
        typescript({
            tsconfig: "./tsconfig.json",
            outputToFilesystem: false,
            sourceMap: true,
            exclude: ["server/**", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "node_modules/**"],
            compilerOptions: {
                declaration: false,
                declarationMap: false
            }
        }),
        css(),
        commonjs(),
        json(),
    ],
},
    {
        input: 'client/index.tsx', // 指向源码入口
        output: [{file: 'dist/client.d.ts', format: 'es'}],
        plugins: [css(), dts({})]
    },
    {
        input: 'common/index.tsx',
        output: [{
            file: 'dist/common.mjs',
            format: 'es',
            sourcemap: true,
            exports: 'auto' // 自动处理模块导出
        }, {
            file: 'dist/common.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: 'auto' // 自动处理模块导出
        }],
        external: [], // 确保不将任何依赖视为外部模块
        plugins: [
            nodeResolve({
                preferBuiltins: true
            }),
            typescript({
                tsconfig: "./tsconfig.json",
                outputToFilesystem: false,
                sourceMap: true,
                exclude: ["client/**", "server/**", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "node_modules/**"],
                compilerOptions: {
                    declaration: false,
                    declarationMap: false
                }
            }),
            css(),
            commonjs(),
            json(),
        ],
    },
    {
        input: 'common/index.tsx', // 指向源码入口
        output: [{file: 'dist/common.d.ts', format: 'es'}],
        plugins: [css(), dts({})]
    },
    {
        input: 'server/index.tsx',
        output: [{
            file: 'dist/server.mjs',
            format: 'es',
            sourcemap: true,
            exports: 'auto' // 自动处理模块导出
        }, {
            file: 'dist/server.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: 'auto' // 自动处理模块导出
        }],
        external: [], // 确保不将任何依赖视为外部模块
        plugins: [
            nodeResolve({
                preferBuiltins: true
            }),
            typescript({
                tsconfig: "./tsconfig.json",
                outputToFilesystem: false,
                sourceMap: true,
                exclude: ["client/**", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "node_modules/**"],
                compilerOptions: {
                    declaration: false,
                    declarationMap: false
                }
            }),
            css(),
            commonjs(),
            json(),
        ],
    },
    {
        input: 'server/index.tsx', // 指向源码入口
        output: [{file: 'dist/server.d.ts', format: 'es'}],
        plugins: [css(), dts()]
    }
]
