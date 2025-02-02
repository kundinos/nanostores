/* eslint-disable unicorn/prefer-module */

import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'

const dists = [
  {
    input: path.resolve(__dirname, './index.js'),
    output: path.resolve(__dirname, './index.common.js')
  },
  {
    input: path.resolve(__dirname, './preact/index.js'),
    output: path.resolve(__dirname, './preact/index.common.js')
  },
  {
    input: path.resolve(__dirname, './react/index.js'),
    output: path.resolve(__dirname, './react/index.common.js')
  },
  {
    input: path.resolve(__dirname, './vue/index.js'),
    output: path.resolve(__dirname, './vue/index.common.js')
  }
]

export default dists.map(dist => ({
  input: dist.input,
  output: [
    {
      file: dist.output,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      inlineDynamicImports: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/prop-types/index.js': [
          'oneOf',
          'func',
          'bool',
          'number',
          'string',
          'object'
        ]
      }
    })
  ]
}))
