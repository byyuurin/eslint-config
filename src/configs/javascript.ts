import js from '@eslint/js'
import globals from 'globals'
import { defineFlatConfigProvider } from '../helpers'
import { pluginAntfu } from '../plugins'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

export const javascript = defineFlatConfigProvider((
  options: OptionsOverrides = {},
) => {
  const {
    overrides = {},
  } = options

  return [
    {
      name: 'byyuurin/eslint-config/rules',
      plugins: {
        antfu: pluginAntfu,
      },
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      rules: {
        ...js.configs.recommended.rules as TypedFlatConfigItem['rules'],

        // Possible Problems
        // https://eslint.org/docs/latest/rules/#possible-problems
        // ----------------------------------------
        'array-callback-return': 'error',
        'no-self-compare': 'error',
        'no-template-curly-in-string': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unreachable-loop': 'error',
        'no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
          },
        ],

        // Suggestions
        // https://eslint.org/docs/latest/rules/#suggestions
        // ----------------------------------------
        'accessor-pairs': [
          'error',
          {
            setWithoutGet: true,
            getWithoutSet: false,
            enforceForClassMembers: true,
          },
        ],
        'block-scoped-var': 'error',
        'default-case-last': 'error',
        'dot-notation': ['warn', { allowKeywords: true }],
        'eqeqeq': ['warn', 'smart'],
        'logical-assignment-operators': ['warn', 'always'],
        'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-else-return': 'warn',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'warn',
        'no-extra-label': 'warn',
        'no-implied-eval': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-object-constructor': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],
        'no-return-assign': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'warn',
        'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
        'no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        }],
        'no-useless-call': 'error',
        'no-useless-computed-key': 'warn',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'warn',
        'no-useless-return': 'warn',
        'no-var': 'warn',
        'no-void': 'error',
        'object-shorthand': [
          'warn',
          'always',
          {
            ignoreConstructors: false,
            avoidQuotes: true,
          },
        ],
        'one-var': ['warn', { initialized: 'never' }],
        'operator-assignment': ['warn', 'always'],
        'prefer-arrow-callback': ['warn', {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        }],
        'prefer-const': ['warn', {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        }],
        'prefer-exponentiation-operator': 'warn',
        'prefer-numeric-literals': 'warn',
        'prefer-object-has-own': 'warn',
        'prefer-object-spread': 'warn',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'warn',
        'require-await': 'error',
        'symbol-description': 'error',
        'vars-on-top': 'error',
        'yoda': ['warn', 'never'],

        // Layout & Formatting
        // https://eslint.org/docs/latest/rules/#layout--formatting
        // ----------------------------------------
        'unicode-bom': ['warn', 'never'],

        ...overrides,
      },
    },
  ]
})
