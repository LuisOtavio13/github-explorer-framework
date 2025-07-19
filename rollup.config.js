import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

// Clean configuration to keep everything as is
export default {
  input: 'src/index.js', // Entry point of the library
  output: {
    file: 'dist/github-api-helper.min.js', // Output file
    format: 'umd', // Universal module definition (works in both browsers and Node.js)
    name: 'GitHubAPIHelper', // Global name of the library
    exports: 'auto', // Let Rollup decide the best export mode
    globals: {
      'axios': 'axios' // External global dependency
    },
    // Preserves license and JSDoc comments
    banner: `/*! GitHub API Helper v1.0.0 | (c) ${new Date().getFullYear()} Your Name | MIT License */`,
    footer: '/* github-api-framework - https://github.com/youruser/github-api-framework */'
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'], // Fields used to resolve modules
      preferBuiltins: true // Prefer Node.js built-in modules when available
    }),
    commonjs({
      include: /node_modules/ // Convert CommonJS modules in node_modules
    }),
    babel({
      babelHelpers: 'bundled', // Bundle babel helpers
      comments: true, // Preserve comments in output
      exclude: 'node_modules/**', // Do not transpile code inside node_modules
      // Preserve specific JSDoc-style comments
      shouldPrintComment: (val) => /@file|@module|@description|@see|@namespace|@param|@returns/.test(val)
    }),
    terser({
      format: {
        comments: (node, comment) => {
          // Keep all JSDoc comments in the final bundle
          return /@file|@module|@description|@see|@namespace|@param|@returns/.test(comment.value);
        },
        beautify: true, // Format output to be more readable
        indent_level: 2 // Indentation for beautified output
      },
      compress: false // Disable compression to retain readability
    })
  ],
  external: ['axios'], // Do not bundle axios, expect it as an external dependency
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
    // Optimizations to reduce unnecessary code in final bundle
  }
};
