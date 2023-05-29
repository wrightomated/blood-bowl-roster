import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
dotenv.config();

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn(
                'npm',
                ['run', 'start', '--', '--dev'],
                {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true,
                }
            );

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

export default {
    input: 'src/main.ts',
    output: {
        format: 'es',
        dir: 'public/build/',
        name: 'app',
        sourcemap: !production,
    },
    plugins: [
        replace({
            preventAssignment: true,
            // needs to be cleaned up
            '__bbroster.env.FIREBASE_API_KEY': process.env.FIREBASE_API_KEY,
            '__bbroster.env.FIREBASE_AUTH_DOMAIN':
                process.env.FIREBASE_AUTH_DOMAIN,
            '__bbroster.env.FIREBASE_PROJECT_ID':
                process.env.FIREBASE_PROJECT_ID,
            '__bbroster.env.FIREBASE_STORAGE_BUCKET':
                process.env.FIREBASE_STORAGE_BUCKET,
            '__bbroster.env.FIREBASE_MESSAGING_SENDER_ID':
                process.env.FIREBASE_MESSAGING_SENDER_ID,
            '__bbroster.env.FIREBASE_APP_ID': process.env.FIREBASE_APP_ID,
            '__bbroster.env.FIREBASE_MEASUREMENT_ID':
                process.env.FIREBASE_MEASUREMENT_ID,
            '__bbroster.env.EVENT_ID': process.env.EVENT_ID,
        }),
        svelte({
            preprocess: sveltePreprocess(),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
