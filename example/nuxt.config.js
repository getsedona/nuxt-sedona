export default {
  modules: [
    [
      '@getsedona/nuxt-sedona',
      {
        verbose: false,
        components: ['card', 'feature'],
      },
    ],
  ],

  build: {
    extractCSS: true,
  },

  watch: ['../lib/*.js'],
}
