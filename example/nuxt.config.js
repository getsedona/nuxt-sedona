// import * as path from 'path'
// import SedonaModule from '../src/module'

export default {
  srcDir: __dirname,
  // rootDir: path.resolve(__dirname, '../'),
  modules: [
    // ['@nuxtjs/style-resources'],
    ['@getsedona/nuxt-sedona', ['card', 'feature']]
  ],

  build: {
    extractCSS: true
  },

  watch: ['../lib/*.js']

  /* styleResources: {
    less: [
      'sedona-components/src/common/variables.less',
      'sedona-components/src/common/functions.less',
      'sedona-components/src/common/mixins.less'
    ]
  } */
}
