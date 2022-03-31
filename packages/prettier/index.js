module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },

  extends: ['prettier', '@vue/prettier', '@vue/prettier/@typescript-eslint'],

  plugins: ['prettier'],

  rules: {
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
        wrapAttributes: 'force-aligned',
      },
    ],
  },
}
