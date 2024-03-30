import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsFiles, OptionsOverrides, OptionsStylistic } from '../types'
import { interopDefault } from '../utils'

export const jsonc = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsOverrides & OptionsStylistic = {},
) => {
  const {
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    overrides = {},
    stylistic = true,
  } = options

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginJsonc,
    parserJsonc,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ] as const)

  return [
    {
      name: 'byyuurin:jsonc:setup',
      plugins: {
        jsonc: pluginJsonc,
      },
    },
    {
      name: 'byyuurin:jsonc:rules',
      languageOptions: {
        parser: parserJsonc,
      },
      files,
      rules: {
        // JSONC Rules
        // https://ota-meshi.github.io/eslint-plugin-jsonc/rules/#jsonc-rules
        // ----------------------------------------
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'warn',
        'jsonc/no-binary-numeric-literals': 'warn',
        'jsonc/no-escape-sequence-in-identifier': 'warn',
        'jsonc/no-hexadecimal-numeric-literals': 'warn',
        'jsonc/no-infinity': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'warn',
        'jsonc/no-numeric-separators': 'warn',
        'jsonc/no-octal-numeric-literals': 'warn',
        'jsonc/no-parenthesized': 'warn',
        'jsonc/no-plus-sign': 'warn',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-template-literals': 'warn',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'warn',
        'jsonc/valid-json-number': 'warn',
        'jsonc/vue-custom-block/no-parsing-error': 'error',

        // Extension Rules
        // https://ota-meshi.github.io/eslint-plugin-jsonc/rules/#extension-rules
        // ----------------------------------------
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-floating-decimal': 'warn',
        'jsonc/no-irregular-whitespace': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'warn',

        ...stylistic
          ? {
              'jsonc/array-bracket-spacing': ['warn', 'never'],
              'jsonc/comma-dangle': ['warn', 'never'],
              'jsonc/comma-style': ['warn', 'last'],
              'jsonc/indent': ['warn', indent],
              'jsonc/key-spacing': ['warn', { afterColon: true, beforeColon: false }],
              'jsonc/object-curly-newline': ['warn', { consistent: true, multiline: true }],
              'jsonc/object-curly-spacing': ['warn', 'always'],
              'jsonc/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
              'jsonc/quote-props': 'warn',
              'jsonc/quotes': 'warn',
            }
          : {},

        ...overrides,
      },
    },
  ]
})

// ref: https://github.com/antfu/eslint-config/blob/main/src/configs/sort.ts

/**
 * Sort package.json
 *
 * Requires `jsonc` config
 */
export const sortPackageJson = defineFlatConfigProvider(() => [
  {
    name: 'byyuurin:jsonc:sort-package-json',
    files: ['**/package.json'],
    rules: {
      'jsonc/sort-array-values': [
        'warn',
        {
          pathPattern: '^files$',
          order: { type: 'asc' },
        },
      ],
      'jsonc/sort-keys': [
        'warn',
        {
          pathPattern: '^$',
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'author',
            'license',
            'funding',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'categories',
            'sideEffects',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'engines',
            'activationEvents',
            'contributes',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
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
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^exports.*$',
          order: [
            'types',
            'import',
            'require',
            'default',
          ],
        },
        {
          order: [
            // client hooks only
            'pre-commit',
            'prepare-commit-msg',
            'commit-msg',
            'post-commit',
            'pre-rebase',
            'post-rewrite',
            'post-checkout',
            'post-merge',
            'pre-push',
            'pre-auto-gc',
          ],
          pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
        },
      ],
    },
  },
])

/**
 * Sort tsconfig.json
 *
 * Requires `jsonc` config
 */
export const sortTsconfigJson = defineFlatConfigProvider(() => [
  {
    name: 'byyuurin:jsonc:sort-tsconfig',
    files: ['**/tsconfig.json', '**/tsconfig.*.json'],
    rules: {
      'jsonc/sort-keys': [
        'warn',
        {
          order: [
            'extends',
            'compilerOptions',
            'references',
            'files',
            'include',
            'exclude',
          ],
          pathPattern: '^$',
        },
        {
          order: [
            /* Projects */
            'incremental',
            'composite',
            'tsBuildInfoFile',
            'disableSourceOfProjectReferenceRedirect',
            'disableSolutionSearching',
            'disableReferencedProjectLoad',
            /* Language and Environment */
            'target',
            'jsx',
            'jsxFactory',
            'jsxFragmentFactory',
            'jsxImportSource',
            'lib',
            'moduleDetection',
            'noLib',
            'reactNamespace',
            'useDefineForClassFields',
            'emitDecoratorMetadata',
            'experimentalDecorators',
            /* Modules */
            'baseUrl',
            'rootDir',
            'rootDirs',
            'customConditions',
            'module',
            'moduleResolution',
            'moduleSuffixes',
            'noResolve',
            'paths',
            'resolveJsonModule',
            'resolvePackageJsonExports',
            'resolvePackageJsonImports',
            'typeRoots',
            'types',
            'allowArbitraryExtensions',
            'allowImportingTsExtensions',
            'allowUmdGlobalAccess',
            /* JavaScript Support */
            'allowJs',
            'checkJs',
            'maxNodeModuleJsDepth',
            /* Type Checking */
            'strict',
            'strictBindCallApply',
            'strictFunctionTypes',
            'strictNullChecks',
            'strictPropertyInitialization',
            'allowUnreachableCode',
            'allowUnusedLabels',
            'alwaysStrict',
            'exactOptionalPropertyTypes',
            'noFallthroughCasesInSwitch',
            'noImplicitAny',
            'noImplicitOverride',
            'noImplicitReturns',
            'noImplicitThis',
            'noPropertyAccessFromIndexSignature',
            'noUncheckedIndexedAccess',
            'noUnusedLocals',
            'noUnusedParameters',
            'useUnknownInCatchVariables',
            /* Emit */
            'declaration',
            'declarationDir',
            'declarationMap',
            'downlevelIteration',
            'emitBOM',
            'emitDeclarationOnly',
            'importHelpers',
            'importsNotUsedAsValues',
            'inlineSourceMap',
            'inlineSources',
            'mapRoot',
            'newLine',
            'noEmit',
            'noEmitHelpers',
            'noEmitOnError',
            'outDir',
            'outFile',
            'preserveConstEnums',
            'preserveValueImports',
            'removeComments',
            'sourceMap',
            'sourceRoot',
            'stripInternal',
            /* Interop Constraints */
            'allowSyntheticDefaultImports',
            'esModuleInterop',
            'forceConsistentCasingInFileNames',
            'isolatedModules',
            'preserveSymlinks',
            'verbatimModuleSyntax',
            /* Completeness */
            'skipDefaultLibCheck',
            'skipLibCheck',
          ],
          pathPattern: '^compilerOptions$',
        },
      ],
    },
  },
])
