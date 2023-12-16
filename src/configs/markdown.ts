import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import { parserPlain } from '../eslint-parser-plain'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsComponentExts, OptionsFiles, OptionsOverrides } from '../types'
import { interopDefault } from '../utils'

export const markdown = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides = {},
) => {
  const {
    componentExts = [],
    files = [GLOB_MARKDOWN],
    overrides = {},
  } = options

  // @ts-expect-error missing types
  const pluginMarkdown = await interopDefault(import('eslint-plugin-markdown'))

  return [
    {
      name: 'byyuurin:markdown:setup',
      plugins: {
        markdown: pluginMarkdown,
      },
    },
    {
      name: 'byyuurin:markdown:processor',
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      // `eslint-plugin-markdown` only creates virtual files for code blocks,
      // but not the markdown file itself. We use `eslint-merge-processors` to
      // add a pass-through processor for the markdown file itself.
      processor: mergeProcessors([
        pluginMarkdown.processors.markdown,
        processorPassThrough,
      ]),
      files,
    },
    {
      name: 'byyuurin:markdown:parser',
      languageOptions: {
        parser: parserPlain,
      },
      files,
    },
    {
      name: 'byyuurin:markdown:disables',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map((ext) => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',

        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-var-requires': 'off',
        'ts/comma-dangle': 'off',
        'ts/consistent-type-imports': 'off',

        // Type aware rules
        'ts/await-thenable': 'off',
        'ts/dot-notation': 'off',
        'ts/no-floating-promises': 'off',
        'ts/no-for-in-array': 'off',
        'ts/no-implied-eval': 'off',
        'ts/no-misused-promises': 'off',
        'ts/no-throw-literal': 'off',
        'ts/no-unnecessary-type-assertion': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-call': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-return': 'off',
        'ts/restrict-plus-operands': 'off',
        'ts/restrict-template-expressions': 'off',
        'ts/unbound-method': 'off',

        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',

        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        ...overrides,
      },
    },
  ]
})
