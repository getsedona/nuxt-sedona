import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'
import consola from 'consola'
import upperFirst from 'lodash/upperFirst'
import mergeWith from 'lodash/mergeWith'
import npmPackage from '../package.json'

const resourceNames = ['variables', 'functions', 'mixins']
const styleNames = ['styles', 'helpers']

const options = {
  verbose: false,
  components: ['common', 'base'],
}

const log = consola.create('nuxt-sedona')

/**
 * Module
 *
 * @exports
 * @param {string[]} [moduleOptions=[]] components list
 */
export default function module(moduleOptions = {}) {
  /// Get node_modules path
  const nuxtMainPath = require.resolve('consola')
  const nodeModules = nuxtMainPath.replace('/consola/dist/consola.js', '')

  /// Sedona components path

  const sedonaPath = path.join(nodeModules, 'sedona-components', 'src')
  if (!fs.existsSync(sedonaPath)) {
    log.error('Dependency `sedona-components` not found. Install it with command `npm i sedona-components`')
    return
  }

  /// Sedona vue components path

  const sedonaVuePath = path.join(
    nodeModules,
    '@getsedona',
    'vue-components',
    'src',
    'components'
  )
  if (!fs.existsSync(sedonaVuePath)) {
    log.error(
      'Dependency `@getsedona/vue-components` not found. Install it with command `npm i @getsedona/vue-components`'
    )
    return
  }

  /// Set transpile for Sedona vue components

  if (Array.isArray(this.options.build.transpile)) {
    this.options.build.transpile.push('@getsedona/vue-components')
  } else {
    this.options.build.transpile = ['@getsedona/vue-components']
  }

  /// Get the wanted component list

  mergeWith(options, Object.assign({}, moduleOptions, this.options.sedona || {}), (from, to) => {
    if (Array.isArray(from) && Array.isArray(to)) {
      return [...from, ...to]
    }
  })

  if (options.verbose) {
    log.info('options', options)
  }

  /**
   * Search and returns style files
   *
   * @param {string} component component name
   * @param {string[]} [fileNames=[]] file names for search
   * @returns {string[]} finded files
   */
  function getStyleFiles(component, fileNames = []) {
    const result = []
    for (const name of fileNames) {
      const filePath = path.format({
        dir: path.resolve(sedonaPath, component),
        ext: '.less',
        name,
      })
      if (fs.existsSync(filePath)) {
        result.push(util.format('sedona-components/src/%s/%s.%s', component, name, 'less'))
      }
    }
    return result
  }

  /**
   * Search and returns style files in project
   *
   * @param {string[]} [fileNames=[]] ile names for search
   * @returns {string[]} finded files
   */
  function getProjectStyleFiles(fileNames = []) {
    const result = []
    for (const name of fileNames) {
      const filePath = path.format({
        dir: path.resolve(this.options.srcDir, 'assets', 'less'),
        ext: '.less',
        name,
      })
      if (fs.existsSync(filePath)) {
        result.push(util.format('~/assets/less/%s.%s', name, 'less'))
      }
    }
    return result
  }

  /**
   * Search and returns vue component name
   *
   * @param {string} component component name
   * @returns {string[]} component names
   */
  function getComponentFiles(component) {
    const componentNameRegex = /^[A-Z]\w+\.js|vue$/
    const componentDirectory = path.resolve(sedonaVuePath, upperFirst(component))
    if (!fs.existsSync(componentDirectory)) {
      return []
    }
    const files = fs.readdirSync(componentDirectory)
    const components = files.filter((item) => componentNameRegex.test(item))
    const result = []
    for (const component of components) {
      result.push([component.replace(/\.(js|jsx|vue)$/, ''), component])
    }
    return result
  }

  const resources = []
  const styles = []
  const vueComponents = {} // { [key:string]: string[] }

  /// Load components (styles and vue components)

  for (const component of options.components) {
    resources.push(...getStyleFiles.call(this, component, resourceNames))
    styles.push(...getStyleFiles.call(this, component, styleNames))

    const componentFiles = getComponentFiles(component)
    if (componentFiles.length > 0) {
      vueComponents[upperFirst(component)] = componentFiles
    }
  }

  /// Load styles in project

  resources.push(...getProjectStyleFiles.call(this, resourceNames))
  styles.push(...getProjectStyleFiles.call(this, styleNames))

  if (options.verbose) {
    log.info('styleResources.less', resources)
    log.info('css', styles)
    log.info('vue components', vueComponents)
  }

  this.options.styleResources = {
    less: resources,
  }
  this.addModule('@nuxtjs/style-resources')

  if (Array.isArray(this.options.css)) {
    this.options.css.push(...styles)
  } else {
    this.options.css = styles
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'plugin.sedona.js',
    options: {
      components: vueComponents,
    },
  })
}

export const meta = npmPackage
