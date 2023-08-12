const basic = require('@byyuurin/eslint-config-basic')

module.exports = {
  overrides: basic.overrides,

  extends: [
    '@byyuurin/eslint-config-basic',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/base',
    'plugin:@typescript-eslint/eslint-recommended',
  ],

  plugins: [
    // https://github.com/typescript-eslint/typescript-eslint
    '@typescript-eslint',
  ],

  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },

  rules: {
    // sync basic rules
    // ----------------------------------------
    'no-var': 'warn',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],

    // override basic rules
    // ----------------------------------------
    'no-useless-constructor': 'off',

    // antfu
    'antfu/generic-spacing': 'warn',
    'antfu/named-tuple-spacing': 'warn',
    'antfu/no-cjs-exports': 'error',
    'antfu/no-const-enum': 'error',
    'antfu/no-ts-export-equal': 'error',

    // Supported Rules
    // https://typescript-eslint.io/rules/#supported-rules
    // ----------------------------------------
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    // '@typescript-eslint/array-type': 'warn',
    // '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    // '@typescript-eslint/ban-tslint-comment': 'warn',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-literal-property-style': 'error',
    // '@typescript-eslint/consistent-generic-constructors': 'warn',
    // '@typescript-eslint/consistent-indexed-object-style': 'warn',
    // '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    // '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    // '@typescript-eslint/explicit-function-return-type': 'error',
    // '@typescript-eslint/explicit-member-accessibility': 'warn',
    // '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/member-delimiter-style': ['warn', { multiline: { delimiter: 'none' } }],
    // '@typescript-eslint/member-ordering': 'error',
    // '@typescript-eslint/method-signature-style': 'warn',
    // '@typescript-eslint/naming-convention': 'error',
    // '@typescript-eslint/no-base-to-string': 'error',
    // '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    // '@typescript-eslint/no-confusing-void-expression': 'warn',
    // '@typescript-eslint/no-duplicate-enum-values': 'error',
    // '@typescript-eslint/no-duplicate-type-constituents': 'warn',
    // '@typescript-eslint/no-dynamic-delete': 'warn',
    // '@typescript-eslint/no-empty-interface': 'warn',
    // '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    // '@typescript-eslint/no-extraneous-class': 'error',
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/no-for-in-array': 'error',
    // '@typescript-eslint/no-import-type-side-effects': 'warn',
    '@typescript-eslint/no-inferrable-types': 'error',
    // '@typescript-eslint/no-invalid-void-type': 'error',
    // '@typescript-eslint/no-meaningless-void-operator': 'warn',
    '@typescript-eslint/no-misused-new': 'error',
    // '@typescript-eslint/no-misused-promises': 'error',
    // '@typescript-eslint/no-mixed-enums': 'error',
    // '@typescript-eslint/no-namespace': 'error',
    // '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    // '@typescript-eslint/no-non-null-assertion': 'error',
    // '@typescript-eslint/no-redundant-type-constituents': 'error',
    // '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    // '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    // '@typescript-eslint/no-unnecessary-condition': 'warn',
    // '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    // '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    // '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    // '@typescript-eslint/no-unsafe-argument': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'error',
    // '@typescript-eslint/no-unsafe-call': 'error',
    // '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    // '@typescript-eslint/no-unsafe-enum-comparison': 'error',
    // '@typescript-eslint/no-unsafe-member-access': 'error',
    // '@typescript-eslint/no-unsafe-return': 'error',
    // '@typescript-eslint/no-useless-empty-export': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
    // '@typescript-eslint/non-nullable-type-assertion-style': 'warn'
    // '@typescript-eslint/parameter-properties': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    // '@typescript-eslint/prefer-enum-initializers': 'error',
    // '@typescript-eslint/prefer-for-of': 'error',
    // '@typescript-eslint/prefer-function-type': 'warn',
    // '@typescript-eslint/prefer-includes': 'warn',
    // '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    // '@typescript-eslint/prefer-nullish-coalescing': 'error',
    // '@typescript-eslint/prefer-optional-chain': 'warn',
    // '@typescript-eslint/prefer-readonly': 'warn',
    // '@typescript-eslint/prefer-readonly-parameter-types': 'error',
    // '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    // '@typescript-eslint/prefer-regexp-exec': 'warn',
    // '@typescript-eslint/prefer-return-this-type': 'warn',
    // '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    // '@typescript-eslint/promise-function-async': 'warn',
    // '@typescript-eslint/require-array-sort-compare': 'error',
    // '@typescript-eslint/restrict-plus-operands': 'error',
    // '@typescript-eslint/restrict-template-expressions': 'error',
    // '@typescript-eslint/sort-type-constituents': 'warn',
    // '@typescript-eslint/strict-boolean-expressions': 'warn',
    // '@typescript-eslint/switch-exhaustiveness-check': 'error',
    // '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': ['warn', {}],
    // '@typescript-eslint/typedef': 'error',
    // '@typescript-eslint/unbound-method': 'error',
    // '@typescript-eslint/unified-signatures': 'error',

    // Extension Rules
    // https://typescript-eslint.io/rules/#extension-rules
    // ----------------------------------------
    // '@typescript-eslint/block-spacing': 'warn',

    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['warn', { before: false, after: true }],

    // '@typescript-eslint/default-param-last': 'error',
    // '@typescript-eslint/dot-notation': 'warn',

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['warn', 'never'],

    'indent': 'off',
    '@typescript-eslint/indent': [
      'warn', 2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
          'TSTypeParameterInstantiation',
        ],
        offsetTernaryExpressions: true,
      },
    ],

    // '@typescript-eslint/init-declarations': 'error',
    // '@typescript-eslint/key-spacing': 'warn',

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['warn', { before: true, after: true }],

    // '@typescript-eslint/lines-around-comment': 'warn',

    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // 'no-empty-function': 'off',
    // '@typescript-eslint/no-empty-function': 'error',

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['warn', 'functions'],

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',

    // '@typescript-eslint/no-implied-eval': 'error',
    // '@typescript-eslint/no-invalid-this': 'error',
    // '@typescript-eslint/no-loop-func': 'error',

    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    // '@typescript-eslint/no-magic-numbers': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    // '@typescript-eslint/no-restricted-imports': 'error',
    // '@typescript-eslint/no-shadow': 'error',
    // '@typescript-eslint/no-throw-literal': 'error',
    // '@typescript-eslint/no-unused-expressions': 'error',

    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'error',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

    // '@typescript-eslint/no-useless-constructor': 'error',

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],

    // '@typescript-eslint/padding-line-between-statements': 'warn',

    'quotes': 'off',
    '@typescript-eslint/quotes': ['warn', 'single'],

    // '@typescript-eslint/require-await': 'error',
    // '@typescript-eslint/return-await': 'error',

    'semi': 'off',
    '@typescript-eslint/semi': ['warn', 'never'],

    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': ['warn', 'always'],

    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'warn',
  },
}
