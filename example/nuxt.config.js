export default {
  modules: [
    [
      '@getsedona/nuxt-sedona',
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
