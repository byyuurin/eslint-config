import { defineFlatConfigProvider } from '../helpers'
import { pluginAntfu, pluginImport, pluginSimpleImportSort, pluginUnusedImports } from '../plugins'
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
        'import': pluginImport,
        'unused-imports': pluginUnusedImports,
        'simple-import-sort': pluginSimpleImportSort,
      },
      name: 'byyuurin/imports/rules',
      rules: {
        // antfu
        // ----------------------------------------
        'antfu/import-dedupe': 'warn',

        // import
        // https://github.com/import-js/eslint-plugin-import#helpful-warnings
        // ----------------------------------------
        'import/export': 'error',
        'import/no-mutable-exports': 'error',

        // import
        // https://github.com/import-js/eslint-plugin-import#module-systems
        // ----------------------------------------

        // import
        // https://github.com/import-js/eslint-plugin-import#static-analysis
        // ----------------------------------------
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        // import
        // https://github.com/import-js/eslint-plugin-import#style-guide
        // ----------------------------------------
        'import/first': 'warn',
        'import/no-duplicates': 'warn',
        'import/no-named-default': 'error',

        // unused-imports
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
        // ----------------------------------------
        ...stylistic
          ? {
              'sort-imports': 'off',
              'import/order': 'off',
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
