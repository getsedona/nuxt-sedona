export default {
  modules: [['@getsedona/nuxt-sedona', ['card', 'feature']]],

  build: {
    extractCSS: true,
  },

  watch: ['../lib/*.js'],
}
