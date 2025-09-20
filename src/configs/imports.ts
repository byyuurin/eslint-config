import { defineFlatConfigProvider } from '../helpers'
import { pluginAntfu, pluginImportLite, pluginSimpleImportSort, pluginUnusedImports } from '../plugins'
import type { OptionsIsInEditor, OptionsStylistic } from '../types'

export const imports = defineFlatConfigProvider((
  options: OptionsIsInEditor & OptionsStylistic = {},
) => {
  const {
    isInEditor = false,
    stylistic = true,
  } = options

  return [
    {
      plugins: {
        'antfu': pluginAntfu,
        'import': pluginImportLite,
        'unused-imports': pluginUnusedImports,
        'simple-import-sort': pluginSimpleImportSort,
      },
      name: 'byyuurin/imports/rules',
      rules: {
        // antfu
        // https://github.com/antfu/eslint-plugin-antfu/tree/main/src/rules
        // ----------------------------------------
        'antfu/import-dedupe': 'warn',

        // import-lite
        // https://github.com/9romise/eslint-plugin-import-lite/tree/main/src/rules
        // ----------------------------------------
        'import/first': 'warn',
        'import/no-duplicates': 'warn',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',

        // unused-imports
        // https://github.com/sweepline/eslint-plugin-unused-imports/tree/master/src/rules
        // ----------------------------------------
        'unused-imports/no-unused-imports': isInEditor ? 'off' : 'warn',

        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],

        // simple-import-sort
        // https://github.com/lydell/eslint-plugin-simple-import-sort
        // ----------------------------------------
        ...stylistic
          ? {
              'sort-imports': 'off',
              'import/newline-after-import': 'warn',

              'simple-import-sort/imports': ['warn', {
                groups: [
                  ['^\\u0000'],
                  ['^node:', '^@?\\w', '^', '^\\.'],
                ],
              }],
              'simple-import-sort/exports': 'warn',
            }
          : {},
      },
    },
  ]
})
