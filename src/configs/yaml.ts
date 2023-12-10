import { GLOB_YAML } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsFiles, OptionsOverrides, OptionsStylistic } from '../types'
import { interopDefault } from '../utils'

export const yaml = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsOverrides & OptionsStylistic = {},
) => {
  const {
    files = [GLOB_YAML],
    overrides = {},
    stylistic = true,
  } = options

  const {
    indent = 2,
    quotes = 'single',
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginYaml,
    parserYaml,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'byyuurin:yaml:setup',
      plugins: {
        yaml: pluginYaml,
      },
    },
    {
      name: 'byyuurin:yaml:rules',
      languageOptions: {
        parser: parserYaml,
      },
      files,
      rules: {
        // YAML Rules
        // https://ota-meshi.github.io/eslint-plugin-yml/rules/#yaml-rules
        // ----------------------------------------
        // 'yaml/block-mapping-colon-indicator-newline': 'warn',
        'yaml/block-mapping-question-indicator-newline': 'warn',
        'yaml/block-mapping': 'warn',
        'yaml/block-sequence-hyphen-indicator-newline': 'warn',
        'yaml/block-sequence': 'warn',
        // 'yaml/file-extension': 'error',
        'yaml/indent': ['warn', indent === 'tab' ? 2 : indent],
        // 'yaml/key-name-casing': 'error',
        'yaml/no-empty-document': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-mapping-value': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-tab-indent': 'error',
        // 'yaml/no-trailing-zeros': 'warn',
        'yaml/plain-scalar': 'warn',
        'yaml/quotes': ['warn', { prefer: quotes, avoidEscape: false }],
        // 'yaml/require-string-key': 'error',
        // 'yaml/sort-keys': 'warn',
        // 'yaml/sort-sequence-values': 'warn',
        'yaml/vue-custom-block/no-parsing-error': 'error',

        // Extension Rules
        // https://ota-meshi.github.io/eslint-plugin-yml/rules/#extension-rules
        // ----------------------------------------
        'yaml/flow-mapping-curly-newline': 'warn',
        'yaml/flow-mapping-curly-spacing': 'warn',
        'yaml/flow-sequence-bracket-newline': 'warn',
        'yaml/flow-sequence-bracket-spacing': 'warn',
        'yaml/key-spacing': 'warn',
        'yaml/no-irregular-whitespace': 'error',
        // 'yaml/no-multiple-empty-lines': 'warn',
        'yaml/spaced-comment': 'warn',

        ...overrides,
      },
    },
  ]
})
