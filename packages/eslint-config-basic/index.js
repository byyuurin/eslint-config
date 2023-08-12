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
    'dist-*',
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

    // force exclude
    '**/.vitepress/cache',
  ],

  extends: [
    './config/base',
    './config/import',
    './config/jsonc',
    './config/unicorn',
    './config/yml',
  ],

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
              // basic information
              'private',
              'license',
              'publisher',

              // project information
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

              // author information
              'author',
              'funding',

              // project contents
              'type',
              'sideEffects',
              'engines',
              'exports',
              'files',
              'types',
              'typesVersions',
              'require',
              'import',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'bin',
              'icon',
              'activationEvents',
              'contributes',
              'scripts',

              // dependencies
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',

              // others
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
      files: ['*.js', '*.cjs'],
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
        'no-alert': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
  ],
}
