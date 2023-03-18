'use strict'

// https://github.com/import-js/eslint-plugin-import
// https://github.com/sweepline/eslint-plugin-unused-imports
module.exports = {
  plugins: [
    'import',
    'unused-imports',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  rules: {
    /* eslint-plugin-import
    ---------------------------------------- */
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-duplicates': 'warn',
    'import/order': 'warn',
    'import/first': 'warn',
    'import/no-mutable-exports': 'error',

    /* eslint-plugin-unused-imports
    ---------------------------------------- */
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // off
    'no-unused-vars': 'off',
  },
}
