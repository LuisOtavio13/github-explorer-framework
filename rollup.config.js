import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

// Configuração bala pra manter tudo do jeito que tá
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/github-api-helper.min.js',
    format: 'umd',
    name: 'GitHubAPIHelper',
    exports: 'auto', // Deixa o Rollup decidir o melhor
    globals: {
      'axios': 'axios'
    },
    // Preserva os comentários de licença e jsdoc
    banner: `/*! GitHub API Helper v1.0.0 | (c) ${new Date().getFullYear()} Seu Nome | MIT License */`,
    footer: '/* github-api-framework - https://github.com/seuuser/github-api-framework */'
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
      preferBuiltins: true
    }),
    commonjs({
      include: /node_modules/
    }),
    babel({
      babelHelpers: 'bundled',
      comments: true, // Mantém os comentários
      exclude: 'node_modules/**',
      // Configuração extra pra não mexer nos comentários
      shouldPrintComment: (val) => /@file|@module|@description|@see|@namespace|@param|@returns/.test(val)
    }),
    terser({
      format: {
        comments: (node, comment) => {
          // Preserva todos os comentários JSDoc
          return /@file|@module|@description|@see|@namespace|@param|@returns/.test(comment.value);
        },
        // Outras configurações do terser
        beautify: true,
        indent_level: 2
      },
      compress: false // Desliga a compressão pra manter a legibilidade
    })
  ],
  // Indica quais libs são externas
  external: ['axios'],
  // Mantém os comentários no bundle final
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
  }
};