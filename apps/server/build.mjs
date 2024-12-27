import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['./index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/index.js',
    target: 'node18',
    external: ['http', 'ws'],
});
