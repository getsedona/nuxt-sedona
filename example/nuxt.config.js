export default {
  rootDir: 'example',

  modules: [
    [
      '../lib/module.js',
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
