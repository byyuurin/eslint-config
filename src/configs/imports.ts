import { defineFlatConfigProvider } from '../helpers'
import type { OptionsIsInEditor, OptionsStylistic } from '../types'
import { interopDefault } from '../utils'

export const imports = defineFlatConfigProvider(async (
  options: OptionsIsInEditor & OptionsStylistic = {},
) => {
  const {
    isInEditor = false,
    stylistic = true,
  } = options

  return [
    {
      plugins: {
        'antfu': await interopDefault(import('eslint-plugin-antfu')),
        // @ts-expect-error missing types
        'import': await interopDefault(import('eslint-plugin-i')),
        // @ts-expect-error missing types
        'unused-imports': await interopDefault(import('eslint-plugin-unused-imports')),
        // @ts-expect-error missing types
        'simple-import-sort': await interopDefault(import('eslint-plugin-simple-import-sort')),
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
        'import/no-named-as-default': 'warn',
        'import/no-named-as-default-member': 'warn',
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
        'import/default': 'error',
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
              'import/newline-after-import': 'off',

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
