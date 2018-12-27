import typescript from 'rollup-plugin-typescript'

export default {
  input: 'example/index.ts',

  output: {
    file: 'example/bundle.js',
    name: 'modal',
    format: 'iife',
    sourcemap: true,
  },

  watch: {
    include: ['src/**', 'example/**'],
  },

  plugins: [typescript()],
}
