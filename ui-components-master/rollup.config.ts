import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-svg';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';

export default [
    {
        input: './src/index.ts',
        output: [
            {
                dir: 'dist/',
                format: 'cjs',
                exports: 'named',
                preserveModules: true,
            },
            {
                dir: 'dist/',
                format: 'es',
                exports: 'named',
                preserveModules: true,
            },
        ],
        plugins: [
            postcss({
                plugins: [],
                minimize: true,
                modules: true,
            }),

            typescript({ tsconfig: './tsconfig.json' }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
            }),
            svg({
                include: '**/*.svg',
            }),
            svgr({
                svgo: false,
            }),
            external(),
            resolve(),
            commonjs(),
            json(),
            image(),
        ],
    },
];
