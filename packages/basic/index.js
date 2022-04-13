module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],

  ignorePatterns: [
    '.cache',
    '*.min.*',
    'dist',
    'public',
    'temp',
    'CHANGELOG.md',
    'LICENSE',
    'LICENSE.*',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vscode',
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
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
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
              'name',
              'version',
              'description',
              'keywords',
              'license',
              'repository',
              'funding',
              'author',
              'type',
              'files',
              'exports',
              'main',
              'module',
              'unpkg',
              'bin',
              'scripts',
              'husky',
              'lint-staged',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'devDependencies',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
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
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-console': 'off',
        'no-unused-expressions': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],

  rules: {
    'semi': ['error', 'never'],
    'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    'eqeqeq': ['error', 'smart'],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'vars-on-top': 'error',
    'camelcase': 'off',
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', { multiline: true }],
    'array-callback-return': 'warn',
    'block-spacing': ['error', 'always'],
    'block-scoped-var': 'error',
    'func-call-spacing': ['warn', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-infix-ops': ['error', { int32Hint: true }],
    'space-before-function-paren': ['error', 'never'],
    'operator-linebreak': ['error', 'before'],
    // 'consistent-return': 'off',
    // 'complexity': ['warn', 11],
    'sort-imports': [
      'error', {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    'no-var': 'error',
    'no-unused-vars': 'warn',
    'no-redeclare': 'error',
    'no-param-reassign': 'off',
    'no-constant-condition': 'warn',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-cond-assign': ['error', 'always'],
    'no-return-await': 'off',
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'no-useless-escape': ['error'],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'no-return-assign': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

    // eslint-plugin-import
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
  },
}
