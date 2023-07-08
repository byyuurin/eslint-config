module.exports = {
  plugins: [
    // https://github.com/import-js/eslint-plugin-import
    'import',
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports',
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  rules: {
    // import
    // ----------------------------------------
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/newline-after-import': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-duplicates': 'warn',
    'import/first': 'warn',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',

    // unused-imports
    // ----------------------------------------
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

    // override rules
    'no-unused-vars': 'off',

    // simple-import-sort
    // ----------------------------------------
    'simple-import-sort/imports': ['warn', {
      groups: [
        ['^\\u0000'],
        ['^node:', '^@?\\w', '^', '^\\.'],
      ],
    }],
    'simple-import-sort/exports': 'warn',

    // override rules
    'sort-imports': 'off',
    'import/order': 'off',
  },
}
