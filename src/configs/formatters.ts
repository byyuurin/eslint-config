import * as parserPlain from 'eslint-parser-plain'
import { GLOB_CSS, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { FlatConfigItem, OptionsFormatters, OptionsStylistic } from '../types'
import { ensurePackages, interopDefault } from '../utils'
import type { VendoredPrettierOptions } from '../vender/prettier-types'
import { stylisticConfigDefaults } from './stylistic'

export const formatters = defineFlatConfigProvider(async (
  options: OptionsStylistic & OptionsFormatters = {},
) => {
  await ensurePackages([
    'eslint-plugin-format',
  ])

  options = {
    css: true,
    html: true,
    toml: true,
    markdown: true,
    graphql: true,
    ...options,
  }

  const {
    indent,
    quotes,
    semi,
  } = {
    ...stylisticConfigDefaults,
    ...typeof options.stylistic === 'boolean' ? {} : options.stylistic,
  }

  const prettierOptions: VendoredPrettierOptions = {
    endOfLine: 'auto',
    semi,
    singleQuote: quotes === 'single',
    tabWidth: typeof indent === 'number' ? indent : 2,
    trailingComma: 'all',
    useTabs: indent === 'tab',

    ...options.prettierOptions,
  }

  const dprintOptions = {
    indentWidth: typeof indent === 'number' ? indent : 2,
    quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
    useTabs: indent === 'tab',
  }

  const items: FlatConfigItem[] = [
    {
      name: 'byyuurin:formatters:setup',
      plugins: {
        format: await interopDefault(import('eslint-plugin-format')),
      },
    },
  ]

  const languageOptions = {
    parser: parserPlain,
  }

  if (options.css) {
    items.push(
      {
        name: 'byyuurin:formatter:css',
        languageOptions,
        files: [GLOB_CSS, GLOB_POSTCSS],
        rules: {
          'format/prettier': ['warn', { ...prettierOptions, parser: 'css' }],
        },
      },
      {
        name: 'byyuurin:formatter:scss',
        languageOptions,
        files: [GLOB_SCSS],
        rules: {
          'format/prettier': ['warn', { ...prettierOptions, parser: 'scss' }],
        },
      },
      {
        name: 'byyuurin:formatter:less',
        languageOptions,
        files: [GLOB_LESS],
        rules: {
          'format/prettier': ['warn', { ...prettierOptions, parser: 'less' }],
        },
      },
    )
  }

  if (options.html) {
    items.push(
      {
        name: 'byyuurin:formatter:html',
        languageOptions,
        files: ['**/*.html'],
        rules: {
          'format/prettier': [
            'warn',
            { ...prettierOptions, parser: 'html' },
          ],
        },
      },
    )
  }

  if (options.toml) {
    items.push({
      name: 'byyuurin:formatter:toml',
      languageOptions,
      files: ['**/*.toml'],
      rules: {
        'format/dprint': [
          'warn',
          {
            ...dprintOptions,
            language: 'toml',
          },
        ],
      },
    })
  }

  if (options.markdown) {
    const formatter = options.markdown === true
      ? 'prettier'
      : options.markdown

    items.push(
      {
        name: 'byyuurin:formatter:markdown',
        languageOptions,
        files: [GLOB_MARKDOWN],
        rules: {
          [`format/${formatter}`]: [
            'warn',
            formatter === 'prettier'
              ? {
                  ...prettierOptions,
                  embeddedLanguageFormatting: 'off',
                  parser: 'markdown',
                }
              : {
                  ...dprintOptions,
                  language: 'markdown',
                },
          ],
        },
      },
    )
  }

  if (options.graphql) {
    items.push(
      {
        name: 'byyuurin:formatter:graphql',
        languageOptions,
        files: ['**/*.graphql'],
        rules: {
          'format/prettier': [
            'warn',
            {
              ...prettierOptions,
              parser: 'graphql',
            },
          ],
        },
      },
    )
  }

  return items
})
