import { defineFlatConfigProvider } from '../helpers'
import { pluginAntfu } from '../plugins'
import type { OptionsOverrides, StylisticConfig } from '../types'
import { interopDefault } from '../utils'

export const stylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export const stylistic = defineFlatConfigProvider(async (
  options: StylisticConfig & OptionsOverrides = {},
) => {
  const {
    indent,
    jsx,
    quotes,
    semi,
    overrides = {},
  } = {
    ...stylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

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
        'style/function-paren-newline': ['warn', 'consistent'],
        'style/generator-star-spacing': ['warn', { before: false, after: true }],
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

        ...overrides,
      },
    },
  ]
})
