import {defineConfig, loadEnv, UserConfig} from 'vite';
import react from "@vitejs/plugin-react-swc"
import path from "node:path";
import dts from 'vite-plugin-dts';

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig((configEnv) => {
    const env = loadEnv(configEnv.mode, __dirname); // 根据 mode 来判断当前是何种环境

    console.log('defineConfig Env', env);
    return {
        mode: env.mode,
        root: process.cwd(),
        base: '/',
        publicDir: 'assets',    // 不存在的目录
        build: {
            sourcemap: true,    // 本就是开源项目，生产环境也生成 sourcemap 方便排查问题
            minify: 'esbuild',
            outDir: `dist`,
            emptyOutDir: false, // 不要清空输出目录，因为还有其他资源文件
            lib: {
                entry: path.resolve(__dirname, 'src/client/index.tsx'),
                name: 'Atom',
                formats: ['es', 'cjs'],
                fileName: (format) => `atom.${format}.js`,
            },
            rollupOptions: {
                external: ['lodash','react'],
                output: {
                    globals: { lodash: 'lodash',react: 'React' },
                },
            },
        },
        esbuild: {
            pure: isProd ? ['console.debug'] : [],
            drop: isProd ? ['debugger'] : []
        },
        plugins: [
            dts({
                outDir: 'dist',  // 输出目录
                exclude: ['example/**','src/**/*.test.ts', 'src/**/*.test.tsx'],
                entryRoot: 'src',
                rollupTypes: true,
                tsconfigPath: 'tsconfig.json',
            }),
            react({tsDecorators: true})
        ],
        clearScreen: false,
    } as UserConfig;
});
