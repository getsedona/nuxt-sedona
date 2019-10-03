import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'
import log from 'consola'
import upperFirst from 'lodash/upperFirst'
import npmPackage from '../package.json'

const defaultComponents = ['common', 'base']
const resourceNames = ['variables', 'functions', 'mixins']
const styleNames = ['styles']

/**
 * Module
 *
 * @exports
 * @param {string[]} [moduleOptions=[]] components list
 */
export default function module(moduleOptions = {}) {
  /// Sedona components path

  const sedonaPath = path.join(this.options.rootDir, 'node_modules', 'sedona-components', 'src')
  if (!fs.existsSync(sedonaPath)) {
    log.error('Dependency `sedona-components` not found. Install it with command `npm i sedona-components`')
    return
  }

  /// Sedona vue components path

  const sedonaVuePath = path.join(
    this.options.rootDir,
    'node_modules',
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

  let components = defaultComponents
  if (Array.isArray(moduleOptions) && moduleOptions.length > 0) {
    components = [...components, ...moduleOptions]
  }
  if (Array.isArray(this.options.sedona) && this.options.sedona.length > 0) {
    components = [...components, ...this.options.sedona]
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
   * Search and returns vue component name
   *
   * @param {string} component component name
   * @returns {string|null} component name
   */
  function getComponentFile(component) {
    const filePath = {
      dir: path.resolve(sedonaVuePath, component),
      name: upperFirst(component),
    }
    const jsFilePath = path.format({
      ...filePath,
      ext: '.js',
    })
    const vueFilePath = path.format({
      ...filePath,
      ext: '.vue',
    })
    if (fs.existsSync(jsFilePath) || fs.existsSync(vueFilePath)) {
      return upperFirst(component)
    }
    return null
  }

  const resources = []
  const styles = []
  const vueComponents = []

  for (const component of components) {
    resources.push(...getStyleFiles.call(this, component, resourceNames))
    styles.push(...getStyleFiles.call(this, component, styleNames))

    const vueComponent = getComponentFile(component)
    if (typeof vueComponent === 'string') {
      vueComponents.push(vueComponent)
    }
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

  if (vueComponents.length > 0) {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.template.js'),
      fileName: path.join('plugin.sedona.js'),
      options: {
        components: vueComponents,
      },
    })
  }
}

export const meta = npmPackage
