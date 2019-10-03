module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:jsdoc/recommended'
  ],
  plugins: ['vue', 'unicorn'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never'
      }
    ],
    'arrow-parens': ['error', 'always'],
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 2,
        outerIIFEBody: 0,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 'first' },
        FunctionExpression: { parameters: 'first' },
        CallExpression: { arguments: 'first' },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        extendDefaultReplacements: false,
        replacements: {
          e: {
            event: true
          },
          er: {
            error: true
          },
          err: {
            error: true
          },
          warn: {
            warning: true
          },
          val: {
            value: true
          }
        }
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: { indent: 'off', 'vue/script-indent': ['error', 2, { baseIndent: 1 }] }
    }
  ]
}
