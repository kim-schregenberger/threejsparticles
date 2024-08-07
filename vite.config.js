import restart from 'vite-plugin-restart'
import glsl from 'vite-plugin-glsl'

export default {
    base: '/threejsparticles/',
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../docs', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
                main: 'src/index.html', // Main entry HTML file
                // other HTML files
                click: 'src/click.html',
                cursor: 'src/cursor.html',
                animate: 'src/animate.html',
                morph: 'src/morph.html',
            },
        },
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }), // Restart server on static file change
        glsl() // Handle shader files
    ]
}

// import { defineConfig } from 'vite';
// import restart from 'vite-plugin-restart';

// export default defineConfig({
//     base: '/elearning-particles/', // GitHub Pages path
//     root: 'src/', // Source files in the src/ directory
//     publicDir: '../static/', // Static assets in the static/ directory
//     server: {
//         host: true, // Open to local host
//         open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if not in CodeSandbox
//     },
//     build: {
//         outDir: '../docs', // Output to docs/ folder
//         emptyOutDir: true, // Empty docs/ folder first
//         sourcemap: true, // Generate sourcemap
//         rollupOptions: {
//             input: {
//                 main: 'src/index.html', // Main entry HTML file
//                 // other HTML files
//                 step1: 'src/step1.html',
//                 step2: 'src/step2.html',
//                 step3: 'src/step3.html',
//                 final: 'src/final.html',
//             },
//         },
//     },
//     plugins: [
//         restart({
//             restart: ['../static/**'], // Restart server on static file change
//         }),
//     ],
// });


// import { defineConfig } from 'vite';
// import glsl from 'vite-plugin-glsl';

// export default defineConfig({
//   root: 'src',
//   publicDir: '../static', // Ensure static assets are included
//   base: './', // Relative base path for assets
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//     sourcemap: true,
//     rollupOptions: {
//       input: {
//         index: 'src/index.html',
//         cursor: 'src/cursor.html',
//         morph: 'src/morph.html',
//         animate: 'src/animate.html',
//         click: 'src/click.html'
//       }
//     }
//   },
//   plugins: [
//     glsl()
//   ]
// });
