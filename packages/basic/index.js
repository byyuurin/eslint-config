module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },

  reportUnusedDisableDirectives: true,

  ignorePatterns: [
    '*.min.*',
    'CHANGELOG.md',
    'LICENSE*',
    'dist',
    'public',
    'temp',
    'output',
    'coverage',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],

  extends: [
    'eslint:recommended',
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
  },

  overrides: [
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'no-multiple-empty-lines': ['error', { max: 0, maxBOF: 0, maxEOF: 0 }],

        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/array-bracket-newline': [
          'error',
          {
            multiline: true,
            minItems: null,
          },
        ],
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],
        'jsonc/indent': ['error', 2],
        'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
        'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'jsonc/no-octal-escape': 'error',
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
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
    {
      // Code blocks in markdown file
      files: ['**/*.md/*.*'],
      rules: {
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
      },
    },
  ],

  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    'quote-props': ['error', 'consistent-as-needed'],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'camelcase': 'off',
    'brace-style': ['error', 'stroustrup', { allowSingleLine: false }],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', { multiline: true }],
    'block-spacing': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'spaced-comment': [
      'error', 'always', {
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
    'sort-imports': [
      'error', {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'arrow-parens': ['error', 'always'],
    'dot-location': ['error', 'property'],
    'dot-notation': ['error', { allowKeywords: true }],

    'no-unused-vars': 'warn',
    'no-empty-pattern': 'error',
    'no-redeclare': 'error',
    'no-constant-condition': 'warn',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-cond-assign': ['error', 'always'],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-extra-parens': ['error', 'functions'],
    'no-irregular-whitespace': 'error',
    'no-loss-of-precision': 'error',
    'no-sparse-arrays': 'error',

    'no-param-reassign': 'off',
    'no-return-await': 'off',

    // best-practice
    'eqeqeq': ['error', 'smart'],
    'vars-on-top': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'operator-linebreak': ['error', 'before'],
    'require-await': 'error',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'no-useless-escape': 'error',
    'no-return-assign': 'error',

    /* ES6
    ---------------------------------------- */
    'no-var': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'prefer-exponentiation-operator': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],

    /* eslint-plugin-import
    ---------------------------------------- */
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',

    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',

    /* eslint-plugin-yml
    ---------------------------------------- */
    'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],

    'yml/no-empty-document': 'off',
  },
}
