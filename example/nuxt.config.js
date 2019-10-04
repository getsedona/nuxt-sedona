export default {
  modules: [
    [
      '@getsedona/nuxt-sedona',
      {
        verbose: true,
        components: ['card', 'feature'],
      },
    ],
  ],

  build: {
    extractCSS: true,
  },

  watch: ['../lib/*.js'],
}
