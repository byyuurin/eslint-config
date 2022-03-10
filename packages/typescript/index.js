const basic = require('@byyuurin/eslint-config-basic')

module.exports = {
  overrides: basic.overrides,

  extends: [
    '@byyuurin/eslint-config-basic',
    'plugin:@typescript-eslint/recommended'
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  rules: {
    // override js
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true, variables: true }],

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],

    // ts
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
