import { defineFlatConfigProvider } from '../helpers'
import type { StylisticConfig } from '../types'
import { interopDefault } from '../utils'

export const stylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export const stylistic = defineFlatConfigProvider(async (
  options: StylisticConfig = {},
) => {
  const {
    indent,
    jsx,
    quotes,
    semi,
  } = {
    ...stylisticConfigDefaults,
    ...options,
  }

  const [
    pluginAntfu,
    pluginStylistic,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-antfu')),
    interopDefault(import('@stylistic/eslint-plugin')),
  ])

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'byyuurin:stylistic',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'curly': ['warn', 'multi-or-nest', 'consistent'],

        'style/arrow-parens': ['warn', 'always'],
        'style/no-extra-semi': 'warn',
        'style/array-bracket-newline': ['warn', 'consistent'],
        'style/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],

        // 'style/func-call-spacing': ['warn', 'never'],

        'style/function-paren-newline': ['warn', 'consistent'],
        'style/generator-star-spacing': ['warn', { before: false, after: true }],

        // 'style/object-curly-newline': ['warn', { multiline: true, consistent: true }],
        // 'style/object-curly-spacing': ['warn', 'always'],
        // 'style/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],

        'style/padding-line-between-statements': [
          'warn',
          ...[
            'block-like',
            'multiline-block-like',
            'multiline-expression',
            'if',
          ].flatMap((statement) => [
            { blankLine: 'always', prev: statement, next: '*' },
            { blankLine: 'always', prev: '*', next: statement },
          ]) as any,
        ],

        // antfu
        // ----------------------------------------
        'antfu/consistent-list-newline': 'warn',
        'antfu/if-newline': 'warn',
        'antfu/top-level-function': 'warn',
      },
    },
  ]
})