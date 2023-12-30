import process from 'node:process'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { FlatConfigItem, OptionsComponentExts, OptionsFiles, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '../types'
import { interopDefault, renameRules, toArray } from '../utils'

export const typescript = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions = {},
) => {
  const {
    componentExts = [],
    overrides = {},
    parserOptions = {},
  } = options

  const files = options.files ?? [
    GLOB_SRC,
    ...componentExts.map((ext) => `**/*.${ext}`),
  ]

  const filesTypeAware = [GLOB_TS, GLOB_TSX]

  const typeAwareRules: FlatConfigItem['rules'] = {
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'no-throw-literal': 'off',
    'ts/await-thenable': 'error',
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': 'error',
    'ts/no-for-in-array': 'error',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-promises': 'error',
    'ts/no-throw-literal': 'error',
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

  const tsconfigPath = options.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'byyuurin:typescript:setup',
      plugins: {
        ts: pluginTs,
      },
    },
    {
      name: 'byyuurin:typescript:rules',
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `*.${ext}`),
          sourceType: 'module',
          ...tsconfigPath
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as any,
        },
      },
      files,
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          '@typescript-eslint/',
          'ts/',
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          '@typescript-eslint/',
          'ts/',
        ),

        // // override basic rules
        // // ----------------------------------------
        'no-useless-constructor': 'off',

        // // Supported Rules
        // // https://typescript-eslint.io/rules/#supported-rules
        // // ----------------------------------------
        // 'ts/adjacent-overload-signatures': 'error',
        // // 'ts/array-type': 'warn',
        // // 'ts/await-thenable': 'error',
        'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        // // 'ts/ban-tslint-comment': 'warn',
        'ts/ban-types': ['error', { types: { Function: false } }],
        // 'ts/class-literal-property-style': 'error',
        // // 'ts/consistent-generic-constructors': 'warn',
        // // 'ts/consistent-indexed-object-style': 'warn',
        // // 'ts/consistent-type-assertions': 'warn',
        'ts/consistent-type-definitions': ['warn', 'interface'],
        // // 'ts/consistent-type-exports': 'warn',
        'ts/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
        // // 'ts/explicit-function-return-type': 'error',
        // // 'ts/explicit-member-accessibility': 'warn',
        // // 'ts/explicit-module-boundary-types': 'error',
        // 'ts/member-delimiter-style': ['warn', { multiline: { delimiter: 'none' } }],
        // // 'ts/member-ordering': 'error',
        // // 'ts/method-signature-style': 'warn',
        // // 'ts/naming-convention': 'error',
        // // 'ts/no-base-to-string': 'error',
        // // 'ts/no-confusing-non-null-assertion': 'warn',
        // // 'ts/no-confusing-void-expression': 'warn',
        // // 'ts/no-duplicate-enum-values': 'error',
        // // 'ts/no-duplicate-type-constituents': 'warn',
        'ts/no-dynamic-delete': 'off',
        // // 'ts/no-empty-interface': 'warn',
        'ts/no-explicit-any': 'off',
        // 'ts/no-extra-non-null-assertion': 'error',
        'ts/no-extraneous-class': 'off',
        // // 'ts/no-floating-promises': 'error',
        // // 'ts/no-for-in-array': 'error',
        'ts/no-import-type-side-effects': 'warn',
        // 'ts/no-inferrable-types': 'error',
        'ts/no-invalid-void-type': 'off',
        // // 'ts/no-meaningless-void-operator': 'warn',
        // 'ts/no-misused-new': 'error',
        // // 'ts/no-misused-promises': 'error',
        // // 'ts/no-mixed-enums': 'error',
        // // 'ts/no-namespace': 'error',
        // // 'ts/no-non-null-asserted-nullish-coalescing': 'error',
        // 'ts/no-non-null-asserted-optional-chain': 'error',
        'ts/no-non-null-assertion': 'off',
        // // 'ts/no-redundant-type-constituents': 'error',
        'ts/no-require-imports': 'error',
        // 'ts/no-this-alias': 'error',
        // // 'ts/no-unnecessary-boolean-literal-compare': 'warn',
        // // 'ts/no-unnecessary-condition': 'warn',
        // // 'ts/no-unnecessary-qualifier': 'warn',
        // // 'ts/no-unnecessary-type-arguments': 'warn',
        // // 'ts/no-unnecessary-type-assertion': 'warn',
        // 'ts/no-unnecessary-type-constraint': 'error',
        // // 'ts/no-unsafe-argument': 'error',
        // // 'ts/no-unsafe-assignment': 'error',
        // // 'ts/no-unsafe-call': 'error',
        // // 'ts/no-unsafe-declaration-merging': 'error',
        // // 'ts/no-unsafe-enum-comparison': 'error',
        // // 'ts/no-unsafe-member-access': 'error',
        // // 'ts/no-unsafe-return': 'error',
        // // 'ts/no-useless-empty-export': 'warn',
        // 'ts/no-var-requires': 'error',
        // // 'ts/non-nullable-type-assertion-style': 'warn'
        // // 'ts/parameter-properties': 'error',
        // 'ts/prefer-as-const': 'error',
        // // 'ts/prefer-enum-initializers': 'error',
        // // 'ts/prefer-for-of': 'error',
        // // 'ts/prefer-function-type': 'warn',
        // // 'ts/prefer-includes': 'warn',
        // // 'ts/prefer-literal-enum-member': 'error',
        // 'ts/prefer-namespace-keyword': 'warn',
        // // 'ts/prefer-nullish-coalescing': 'error',
        // // 'ts/prefer-optional-chain': 'warn',
        // // 'ts/prefer-readonly': 'warn',
        // // 'ts/prefer-readonly-parameter-types': 'error',
        // // 'ts/prefer-reduce-type-parameter': 'warn',
        // // 'ts/prefer-regexp-exec': 'warn',
        // // 'ts/prefer-return-this-type': 'warn',
        // // 'ts/prefer-string-starts-ends-with': 'warn',
        'ts/prefer-ts-expect-error': 'warn',
        // // 'ts/promise-function-async': 'warn',
        // // 'ts/require-array-sort-compare': 'error',
        // // 'ts/restrict-plus-operands': 'error',
        // // 'ts/restrict-template-expressions': 'error',
        // // 'ts/sort-type-constituents': 'warn',
        // // 'ts/strict-boolean-expressions': 'warn',
        // // 'ts/switch-exhaustiveness-check': 'error',
        'ts/triple-slash-reference': 'off',
        // 'ts/type-annotation-spacing': ['warn', {}],
        // // 'ts/typedef': 'error',
        // // 'ts/unbound-method': 'error',
        'ts/unified-signatures': 'off',

        // // Extension Rules
        // // https://typescript-eslint.io/rules/#extension-rules
        // // ----------------------------------------
        // // 'ts/block-spacing': 'warn',

        // 'brace-style': 'off',
        // 'ts/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],

        // 'comma-dangle': 'off',
        // 'ts/comma-dangle': ['warn', 'always-multiline'],

        // 'comma-spacing': 'off',
        // 'ts/comma-spacing': ['warn', { before: false, after: true }],

        // // 'ts/default-param-last': 'error',
        // // 'ts/dot-notation': 'warn',

        // 'style/func-call-spacing': 'off',
        // 'ts/func-call-spacing': ['warn', 'never'],

        // 'style/indent': 'off',
        // 'ts/indent': [
        //   'warn',
        //   2,
        //   {
        //     SwitchCase: 1,
        //     VariableDeclarator: 1,
        //     outerIIFEBody: 1,
        //     MemberExpression: 1,
        //     FunctionDeclaration: { parameters: 1, body: 1 },
        //     FunctionExpression: { parameters: 1, body: 1 },
        //     CallExpression: { arguments: 1 },
        //     ArrayExpression: 1,
        //     ObjectExpression: 1,
        //     ImportDeclaration: 1,
        //     flatTernaryExpressions: false,
        //     ignoreComments: false,
        //     ignoredNodes: [
        //       'TemplateLiteral *',
        //       'JSXElement',
        //       'JSXElement > *',
        //       'JSXAttribute',
        //       'JSXIdentifier',
        //       'JSXNamespacedName',
        //       'JSXMemberExpression',
        //       'JSXSpreadAttribute',
        //       'JSXExpressionContainer',
        //       'JSXOpeningElement',
        //       'JSXClosingElement',
        //       'JSXFragment',
        //       'JSXOpeningFragment',
        //       'JSXClosingFragment',
        //       'JSXText',
        //       'JSXEmptyExpression',
        //       'JSXSpreadChild',
        //       'TSTypeParameterInstantiation',
        //     ],
        //     offsetTernaryExpressions: true,
        //   },
        // ],

        // // 'ts/init-declarations': 'error',
        // // 'ts/key-spacing': 'warn',

        // 'keyword-spacing': 'off',
        // 'ts/keyword-spacing': ['warn', { before: true, after: true }],

        // // 'ts/lines-around-comment': 'warn',

        // 'lines-between-class-members': 'off',
        // 'ts/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],

        // 'no-array-constructor': 'off',
        // 'ts/no-array-constructor': 'error',

        'no-dupe-class-members': 'off',
        'ts/no-dupe-class-members': 'error',

        // // 'no-empty-function': 'off',
        // // 'ts/no-empty-function': 'error',

        // 'no-extra-parens': 'off',
        // 'ts/no-extra-parens': ['warn', 'functions'],

        // 'no-extra-semi': 'off',
        // 'ts/no-extra-semi': 'error',

        // // 'ts/no-implied-eval': 'error',
        // // 'ts/no-invalid-this': 'error',
        // // 'ts/no-loop-func': 'error',

        'no-loss-of-precision': 'off',
        'ts/no-loss-of-precision': 'error',

        // // 'ts/no-magic-numbers': 'error',

        'no-redeclare': 'off',
        'ts/no-redeclare': 'error',

        // // 'ts/no-restricted-imports': 'error',
        // // 'ts/no-shadow': 'error',
        // // 'ts/no-throw-literal': 'error',
        // // 'ts/no-unused-expressions': 'error',

        // // 'no-unused-vars': 'off',
        'ts/no-unused-vars': 'off',

        'no-use-before-define': 'off',
        'ts/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

        'ts/no-useless-constructor': 'off',

        // 'object-curly-spacing': 'off',
        // 'ts/object-curly-spacing': ['warn', 'always'],

        // // 'ts/padding-line-between-statements': 'warn',

        // 'quotes': 'off',
        // 'ts/quotes': ['warn', 'single'],

        // // 'ts/require-await': 'error',
        // // 'ts/return-await': 'error',

        // 'semi': 'off',
        // 'ts/semi': ['warn', 'never'],

        // 'space-before-blocks': 'off',
        // 'ts/space-before-blocks': ['warn', 'always'],

        // 'style/space-before-function-paren': 'off',
        // 'ts/space-before-function-paren': [
        //   'warn',
        //   {
        //     anonymous: 'always',
        //     named: 'never',
        //     asyncArrow: 'always',
        //   },
        // ],

        // 'space-infix-ops': 'off',
        // 'ts/space-infix-ops': 'warn',

        ...overrides,
      },
    },
    {
      // ref: https://github.com/antfu/eslint-config/commit/0c1c8db2b76bb08ecf7d92a0ed47628281b44ec2
      name: 'byyuurin:typescript:rules-type-aware',
      files: filesTypeAware,
      rules: {
        ...tsconfigPath ? typeAwareRules : {},
        ...overrides,
      },
    },
    {
      name: 'byyuurin:typescript:dts-overrides',
      files: ['**/*.d.ts'],
      rules: {
        'no-restricted-syntax': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: 'byyuurin:typescript:tests-overrides',
      files: ['**/*.{test,spec}.ts?(x)'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      name: 'byyuurin:typescript:javascript-overrides',
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
  ]
})
