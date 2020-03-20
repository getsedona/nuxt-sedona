export default {
  rootDir: 'example',

  modules: [
    [
      '../lib/index.js',
      {
        verbose: true,
        components: ['card', 'feature', 'grid'],
      },
    ],
  ],

  build: {
    extractCSS: true,
  },

  watch: ['../lib/*.js'],
}
