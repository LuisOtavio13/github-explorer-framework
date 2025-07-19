import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/github-api-helper.min.js',
      format: 'umd',
      name: 'GitHubAPIHelper',
      exports: 'named', // Mais explícito que 'auto'
      globals: { axios: 'axios' },
      sourcemap: true, // Gera sourcemap para debugging
      banner: `/*! GitHub API Helper v1.0.0 | (c) ${new Date().getFullYear()} TylorSwift2 | GPL-3.0 License */`
    },
    {
      file: 'dist/github-api-helper.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main', 'browser'],
      extensions: ['.js', '.json'],
      dedupe: ['axios'] // Evita duplicação de dependências
    }),
    commonjs({
      include: /node_modules/,
      exclude: ['src/**'],
      sourceMap: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { targets: { browsers: ['> 0.5%, not dead'] } }]]
    }),
    terser({
      format: {
        comments: /@license|@preserve|@file|@module|@description/,
        beautify: false // Desativado para produção
      },
      compress: {
        drop_console: true, // Remove console.logs em produção
        pure_funcs: ['console.debug', 'console.warn'] // Remove específicos
      },
      mangle: {
        properties: {
          regex: /^_/ // Mangle apenas propriedades que começam com _
        }
      }
    })
  ],
  external: ['axios'],
  treeshake: {
    moduleSideEffects: 'no-external',
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
    annotations: true // Melhora tree-shaking baseado em JSDoc
  },
  onwarn(warning, warn) {
    // Ignora avisos específicos
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
};