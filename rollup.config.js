import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',

  output: {
    file: 'public/bundle.js',
    name: 'modal',
    format: 'iife',
    sourcemap: true,
  },

  watch: {
    include: 'src/**',
  },

  plugins: [typescript()],
}
