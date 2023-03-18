const basic = require('@byyuurin/eslint-config-basic')

module.exports = {
  overrides: basic.overrides,

  extends: [
    '@byyuurin/eslint-config-basic',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/base',
    'plugin:@typescript-eslint/eslint-recommended',
  ],

  plugins: ['@typescript-eslint'],

  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },

  rules: {
    /* sync basic rules
    ---------------------------------------- */
    'no-var': 'warn',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],

    /* override basic rules
    ---------------------------------------- */
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['warn', { before: false, after: true }],

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

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['warn', { before: true, after: true }],

    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['warn', 'functions'],

    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    // 'no-empty-function': 'off',
    // '@typescript-eslint/no-empty-function': 'off',

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',

    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],

    'quotes': 'off',
    '@typescript-eslint/quotes': ['warn', 'single'],

    'semi': 'off',
    '@typescript-eslint/semi': ['warn', 'never'],

    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'warn',

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

    // off
    'no-useless-constructor': 'off',

    /* @typescript-eslint
    ---------------------------------------- */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/member-delimiter-style': ['warn', { multiline: { delimiter: 'none' } }],
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/type-annotation-spacing': ['warn', {}],

    // off
    // '@typescript-eslint/ban-types': 'off',
    // '@typescript-eslint/consistent-indexed-object-style': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-member-accessibility': 'off',
    // '@typescript-eslint/naming-convention': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/no-namespace': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/parameter-properties': 'off',
    // '@typescript-eslint/triple-slash-reference': 'off',
  },
}
