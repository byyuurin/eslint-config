module.exports = {
  reportUnusedDisableDirectives: true,

  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },

  env: {
    es6: true,
    es2021: true,
    node: true,
    browser: true,
  },

  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly',
  },

  ignorePatterns: [
    // nonsupport
    '*.css',
    '*.png',
    '*.ico',
    '*.toml',
    '*.patch',
    '*.txt',
    '*.crt',
    '*.key',
    'Dockerfile',
    'LICENSE*',

    // file
    '*.min.*',
    '*.d.ts',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'CHANGELOG.md',

    // folder
    'dist',
    'public',
    'temp',
    'output',
    'out',
    'coverage',
    '__snapshots__',

    // force include
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],

  extends: [
    'plugin:import/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],

  plugins: ['html'],

  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
    'html': {
      'indent': '0',
      'report-bad-indent': 'warn',
    },
  },

  overrides: [
    {
      files: ['*.json', '*.jsonc', '*.json5', '*.code-snippets'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'no-multiple-empty-lines': ['warn', { max: 0, maxBOF: 0, maxEOF: 0 }],
        'jsonc/array-bracket-spacing': ['warn', 'never'],
        'jsonc/array-bracket-newline': 'off',
        'jsonc/comma-dangle': ['warn', 'never'],
        'jsonc/comma-style': ['warn', 'last'],
        'jsonc/indent': ['warn', 2],
        'jsonc/key-spacing': ['warn', { beforeColon: false, afterColon: true, mode: 'strict' }],
        'jsonc/object-curly-newline': ['warn', { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': ['warn', 'always'],
        'jsonc/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
        'jsonc/no-octal-escape': 'error',
      },
    },
    {
      files: ['.vscode/extensions.json', '.vscode/settings.json', '.vscode/*.code-snippets'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/comma-dangle': ['warn', 'always-multiline'],
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'warn',
          {
            pathPattern: '^$',
            order: [
              /* basic information
              ---------------------------------------- */
              'private',
              'license',
              'publisher',

              /* project information
              ---------------------------------------- */
              'packageManager',
              'version',
              'name',
              'displayName',
              'description',
              'categories',
              'keywords',
              'repository',
              'homepage',
              'bugs',

              /* author information
              ---------------------------------------- */
              'author',
              'funding',

              /* project contents
              ---------------------------------------- */
              'type',
              'sideEffects',
              'engines',
              'exports',
              'files',
              'types',
              'typesVersions',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'bin',
              'icon',
              'activationEvents',
              'contributes',
              'scripts',

              /* dependencies
              ---------------------------------------- */
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',

              /* others
              ---------------------------------------- */
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^exports.*$',
            order: [
              'types',
              'require',
              'import',
            ],
          },
        ],
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': 'off',
      },
    },
    {
      files: ['pnpm-lock.yaml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'yml/quotes': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      rules: {
        'no-void': ['error', { allowAsStatement: true }],
      },
    },
    {
      files: ['scripts/**/*.*', 'cli.*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },

    // Code blocks in markdown file
    {
      files: ['**/*.md/*.*'],
      rules: {
        'no-var': 'warn',
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
  ],

  rules: {
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false,
        enforceForClassMembers: true,
      },
    ],
    'array-bracket-spacing': ['warn', 'never'],
    'array-bracket-newline': 'off',
    'array-callback-return': 'error',
    'arrow-spacing': ['warn', { before: true, after: true }],
    'arrow-parens': ['warn', 'always'],
    'block-scoped-var': 'error',
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],
    'camelcase': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'comma-style': ['warn', 'last'],
    'computed-property-spacing': ['warn', 'never', { enforceForClassMembers: true }],
    'constructor-super': 'error',
    'curly': ['warn', 'multi-or-nest', 'consistent'],
    'default-case-last': 'error',
    'dot-location': ['warn', 'property'],
    'dot-notation': ['warn', { allowKeywords: true }],
    'eqeqeq': ['error', 'smart'],
    'func-call-spacing': ['warn', 'never'],
    'generator-star-spacing': ['warn', { before: false, after: true }],
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['warn', { before: true, after: true }],
    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
    'multiline-ternary': ['warn', 'always-multiline'],
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    'new-parens': 'warn',
    'no-alert': 'warn',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-const-assign': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-useless-backreference': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-extra-parens': ['warn', 'functions'],
    'no-fallthrough': 'error',
    'no-floating-decimal': 'warn',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'error',
    'no-useless-catch': 'error',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||', '?:'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'warn',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'off',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'warn',
    'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-assign': 'error',
    'no-return-await': 'off',
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-undef-init': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': 'warn',
    'no-use-before-define': [
      'error', {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'warn',
    'no-useless-return': 'warn',
    'no-var': 'warn',
    'no-void': 'error',
    'no-whitespace-before-property': 'warn',
    'no-with': 'error',
    'object-curly-newline': ['warn', { multiline: true, consistent: true }],
    'object-curly-spacing': ['warn', 'always'],
    'object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
    'object-shorthand': [
      'warn', 'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'one-var': ['warn', { initialized: 'never' }],
    'operator-linebreak': ['warn', 'before'],
    'padded-blocks': [
      'warn',
      {
        blocks: 'never',
        switches: 'never',
        classes: 'never',
      },
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-exponentiation-operator': 'warn',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'warn',
    'quote-props': ['warn', 'consistent-as-needed'],
    'quotes': ['warn', 'single'],
    'require-await': 'error',
    'rest-spread-spacing': ['warn', 'never'],
    'semi': ['warn', 'never'],
    'semi-spacing': ['warn', { before: false, after: true }],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': 'warn',
    'space-unary-ops': ['warn', { words: true, nonwords: false }],
    'spaced-comment': [
      'warn', 'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['/', '#'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'symbol-description': 'error',
    'template-curly-spacing': ['warn', 'never'],
    'template-tag-spacing': ['warn', 'never'],
    'unicode-bom': ['warn', 'never'],
    'use-isnan': [
      'error',
      {
        enforceForSwitchCase: true,
        enforceForIndexOf: true,
      },
    ],
    'valid-typeof': ['error', { requireStringLiterals: true }],
    'vars-on-top': 'error',
    'wrap-iife': ['warn', 'any', { functionPrototypeMethods: true }],
    'yield-star-spacing': ['warn', 'both'],
    'yoda': ['warn', 'never'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    /* EditorConfig
    ---------------------------------------- */
    'indent': [
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
        offsetTernaryExpressions: true,
        ignoredNodes: ['TemplateLiteral *', 'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      },
    ],
    'linebreak-style': 'off',
    'no-trailing-spaces': [
      'warn',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],
    'eol-last': ['warn', 'always'],

    /* eslint:recommended
    ---------------------------------------- */
    'for-direction': 'error',
    'getter-return': 'error',
    'no-dupe-else-if': 'error',
    'no-extra-semi': 'warn',
    'no-inner-declarations': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-setter-return': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-labels': 'warn',
    'require-yield': 'error',

    /* eslint-plugin-import
    ---------------------------------------- */
    'import/order': 'warn',
    'import/first': 'warn',
    'import/no-mutable-exports': 'error',

    // off
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',

    /* eslint-plugin-yml
    ---------------------------------------- */
    'yml/quotes': ['warn', { prefer: 'single', avoidEscape: false }],

    // off
    'yml/no-empty-document': 'off',
  },
}
