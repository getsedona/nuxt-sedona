# Sedona Nuxt.js module

## Features

- Auto include Sedona Component styles (from `sedona-components` package)
- Share variables, mixins, functions across all style files
- Registering async Sedona Vue Components (from `@getsedona/vue-components` package)

## Install

`npm i @getsedona/nuxt-sedona`

## Setup

1. Add `@getsedona/nuxt-sedona` to `nuxt.config.js`

```js
export default {
  modules: ['@getsedona/nuxt-sedona'],
}
```

2. To enumerate wanted sedona components in config

```js
export default {
  modules: ['@getsedona/nuxt-sedona'],
  sedona: {
    components: ['card', 'feature'],
  },
}
```

## What will do

With this config will include next files:

### Variables, mixins and functions

1. `sedona-components/src/common/variables.less`
2. `sedona-components/src/common/functions.less`
3. `sedona-components/src/common/mixins.less`
4. `sedona-components/src/base/variables.less`
5. `sedona-components/src/base/mixins.less`
6. `sedona-components/src/feature/variables.less`
7. `~/assets/less/variables.less`
8. `~/assets/less/styles.less`

### Styles and helpers

1. `sedona-components/src/common/styles.less`
2. `sedona-components/src/common/helpers.less`
3. `sedona-components/src/base/styles.less`
4. `sedona-components/src/card/styles.less`
5. `sedona-components/src/feature/styles.less`

### It will generated code for registering async vue components

```js
Vue.component('Card', () => import(/* webpackChunkName: "card" */ `@getsedona/vue-components/src/components/Card/Card`))
Vue.component('Feature', () =>
  import(/* webpackChunkName: "feature" */ `@getsedona/vue-components/src/components/Feature/Feature`)
)
```
