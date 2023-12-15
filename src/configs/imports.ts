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
      name: 'byyuurin:imports:rules',
      rules: {
        // antfu
        // ----------------------------------------
        'antfu/import-dedupe': 'warn',

        // import
        // https://github.com/import-js/eslint-plugin-import#helpful-warnings
        // ----------------------------------------
        'import/export': 'error',
        // 'import/no-deprecated': 'error',
        // 'import/no-empty-named-blocks': 'error',
        // 'import/no-extraneous-dependencies': 'error',
        'import/no-mutable-exports': 'error',
        // 'import/no-named-as-default': 'warn',
        // 'import/no-named-as-default-member': 'warn',
        // 'import/no-unused-modules': 'error',

        // import
        // https://github.com/import-js/eslint-plugin-import#module-systems
        // ----------------------------------------
        // 'import/no-amd': 'error',
        // 'import/no-commonjs': 'error',
        // 'import/no-import-module-exports': 'error',
        // 'import/no-nodejs-modules': 'error',
        // 'import/unambiguous': 'error',

        // import
        // https://github.com/import-js/eslint-plugin-import#static-analysis
        // ----------------------------------------
        // 'import/default': 'error',
        'import/named': 'error',
        // 'import/namespace': 'error',
        // 'import/no-absolute-path': 'error',
        // 'import/no-cycle': 'error',
        // 'import/no-dynamic-require': 'error',
        // 'import/no-internal-modules': 'error',
        // 'import/no-relative-packages': 'warn',
        // 'import/no-relative-parent-imports': 'error',
        // 'import/no-restricted-paths': 'error',
        'import/no-self-import': 'error',
        // 'import/no-unresolved': 'error',
        // 'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',

        // import
        // https://github.com/import-js/eslint-plugin-import#style-guide
        // ----------------------------------------
        // 'import/consistent-type-specifier-style': 'warn',
        // 'import/dynamic-import-chunkname': 'error',
        // 'import/exports-last': 'error',
        // 'import/extensions': 'error',
        'import/first': 'warn',
        // 'import/group-exports': 'error',
        // 'import/max-dependencies': 'error',
        // 'import/no-anonymous-default-export': 'error',
        // 'import/no-default-export': 'error',
        'import/no-duplicates': 'warn',
        'import/no-named-default': 'error',
        // 'import/no-named-export': 'error',
        // 'import/no-namespace': 'warn',
        // 'import/no-unassigned-import': 'error',
        // 'import/order': 'warn',
        // 'prefer-default-export': 'error',

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
