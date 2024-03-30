import { parserPlain } from '../eslint-parser-plain'
import { GLOB_CSS, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { FormatterConfig, OptionsFormatters, OptionsStylistic, StylisticConfig, TypedFlatConfigItem } from '../types'
import { interopDefault, toArray } from '../utils'
import type { VendoredDprintOptions } from '../vender/dprint-types'
import type { VendoredPrettierOptions } from '../vender/prettier-types'
import { stylisticConfigDefaults } from './stylistic'

const packageName = 'eslint-plugin-format'

export const formattersRequirePackages = toArray(packageName)

export const formatters = defineFlatConfigProvider(async (
  options: OptionsStylistic & OptionsFormatters = {},
) => {
  options = {
    css: true,
    html: true,
    markdown: true,
    graphql: true,
    ...options,
  }

  const prettierOptionsOverrides = typeof options.prettierOptions === 'object'
    ? options.prettierOptions
    : {}

  const drpintOptionsOverrides = typeof options.dprintOptions === 'object'
    ? options.dprintOptions
    : {}

  const stylisticConfig = typeof options.stylistic === 'boolean'
    ? {}
    : options.stylistic

  const items: TypedFlatConfigItem[] = [
    {
      name: 'byyuurin:formatters:setup',
      plugins: {
        format: await interopDefault(import(packageName)),
      },
    },
  ]

  const languageOptions = {
    parser: parserPlain,
  }

  if (options.css) {
    const prettierOptions = resolvePrettierOptions(
      prettierOptionsOverrides,
      stylisticConfig,
      options.css,
    )

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
    const prettierOptions = resolvePrettierOptions(
      prettierOptionsOverrides,
      stylisticConfig,
      options.html,
    )

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

  if (options.markdown) {
    const formatterConfig = typeof options.markdown === 'boolean' ? {} : options.markdown
    const { formatter = 'prettier' } = formatterConfig

    const prettierOptions = resolvePrettierOptions(
      prettierOptionsOverrides,
      stylisticConfig,
      formatterConfig,
    )

    const dprintOptions = resolveDprintOptions(
      drpintOptionsOverrides,
      stylisticConfig,
      formatterConfig,
    )

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
    const prettierOptions = resolvePrettierOptions(
      drpintOptionsOverrides,
      stylisticConfig,
      options.graphql,
    )

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

function resolveStylisticConfig(
  stylisticConfigOverrides: StylisticConfig | true,
) {
  const stylisticConfig: StylisticConfig = {
    ...stylisticConfigDefaults,
    ...typeof stylisticConfigOverrides === 'boolean' ? {} : stylisticConfigOverrides,
  }

  return stylisticConfig
}

function resolvePrettierOptions(
  prettierOptionsOverrides: VendoredPrettierOptions,
  stylisticConfig: StylisticConfig = {},
  formatterConfig: FormatterConfig | true = true,
) {
  const {
    indent,
    quotes,
    semi,
  } = resolveStylisticConfig({
    ...stylisticConfig,
    ...typeof formatterConfig === 'boolean' ? {} : formatterConfig,
  })

  const prettierOptions: VendoredPrettierOptions = {
    endOfLine: 'auto',
    semi,
    singleQuote: quotes === 'single',
    tabWidth: typeof indent === 'number' ? indent : 2,
    trailingComma: 'all',
    useTabs: indent === 'tab',

    ...prettierOptionsOverrides,
  }

  return prettierOptions
}

function resolveDprintOptions(
  drpintOptionsOverrides: VendoredDprintOptions,
  stylisticConfig: StylisticConfig = {},
  formatterConfig: FormatterConfig | true = true,
) {
  const {
    indent,
    quotes,
  } = resolveStylisticConfig({
    ...stylisticConfig,
    ...typeof formatterConfig === 'boolean' ? {} : formatterConfig,
  })

  const dprintOptions: VendoredDprintOptions = {
    indentWidth: typeof indent === 'number' ? indent : 2,
    quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
    useTabs: indent === 'tab',

    ...drpintOptionsOverrides,
  }

  return dprintOptions
}
