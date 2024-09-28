import process from 'node:process'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsComponentExts, OptionsFiles, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes, TypedFlatConfigItem } from '../types'
import { interopDefault, renameRules } from '../utils'

export const typescript = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions = {},
) => {
  const {
    componentExts = [],
    overrides = {},
    parserOptions = {},
    tsconfigPath,
  } = options

  const files = options.files ?? [
    GLOB_SRC,
    ...componentExts.map((ext) => `**/*.${ext}`),
  ]

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  // ref: https://github.com/antfu/eslint-config/pull/384
  function resolveParser(isTypeAware: boolean, files: string[], ignores: string[] = []): TypedFlatConfigItem {
    return {
      name: `byyuurin/typescript/${isTypeAware ? 'type-aware-parser' : 'parser'}`,
      files,
      ignores,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          sourceType: 'module',
          ...isTypeAware
            ? {
                projectService: {
                  projectService: true,
                  tsconfigRootDir: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as any,
        },
      },
    }
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'byyuurin/typescript/setup',
      plugins: {
        ts: pluginTs,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...tsconfigPath
      ? [
          resolveParser(true, filesTypeAware),
          resolveParser(false, files, filesTypeAware),
        ]
      : [resolveParser(false, files)],
    {
      name: 'byyuurin/typescript/rules',
      files,
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),

        // Supported Rules
        // https://typescript-eslint.io/rules/#supported-rules
        // ----------------------------------------
        'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['warn', 'interface'],
        'ts/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],

        // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/method-signature-style': ['warn', 'property'],

        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'warn',
        // 'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        }],
        // 'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

        // Extension Rules
        // https://typescript-eslint.io/rules/#extension-rules
        // ----------------------------------------
        'no-dupe-class-members': 'off',
        'ts/no-dupe-class-members': 'error',

        'no-redeclare': 'off',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],

        'ts/no-unused-vars': 'off',

        'no-use-before-define': 'off',
        'ts/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

        'no-useless-constructor': 'off',
        'ts/no-useless-constructor': 'off',

        ...overrides,
      },
    },
    {
      name: 'byyuurin/typescript/rules-type-aware',
      files: filesTypeAware,
      rules: {
        ...tsconfigPath
          ? {
              'dot-notation': 'off',
              'no-implied-eval': 'off',
              'no-throw-literal': 'off',
              'ts/await-thenable': 'error',
              'ts/dot-notation': ['error', { allowKeywords: true }],
              'ts/no-floating-promises': 'error',
              'ts/no-for-in-array': 'error',
              'ts/no-implied-eval': 'error',
              'ts/no-misused-promises': 'error',
              'ts/no-unnecessary-type-assertion': 'error',
              'ts/no-unsafe-argument': 'error',
              'ts/no-unsafe-assignment': 'error',
              'ts/no-unsafe-call': 'error',
              'ts/no-unsafe-member-access': 'error',
              'ts/no-unsafe-return': 'error',
              'ts/restrict-plus-operands': 'error',
              'ts/restrict-template-expressions': 'error',
              'ts/unbound-method': 'error',
            }
          : {},
        ...overrides,
      },
    },
  ]
})
