module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },

  extends: ['eslint:recommended'],

  rules: {
    // es6
    'no-var': 'error',

    // prettier
    'prettier/prettier': [
      'warn',
      {
        tabWidth: 2,
        printWidth: 120,
        useTabs: false,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'none',
        stylelintIntegration: true,
        eslintIntegration: true,
        wrapAttributes: 'force-aligned'
      }
    ]
  }
}
