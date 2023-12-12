// @ts-expect-error missing types
import js from '@eslint/js'
import globals from 'globals'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import { pluginAntfu } from '../plugins'
import type { OptionsOverrides } from '../types'

export const javascript = defineFlatConfigProvider((
  options: OptionsOverrides = {},
) => {
  const {
    overrides = {},
  } = options

  const recommendedRules = {
    ...js.configs.recommended.rules,

    // fixture breaker
    'no-mixed-spaces-and-tabs': 'off',
    'no-useless-escape': 'off',
  }

  return [
    {
      name: 'byyuurin:javascript',
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
        ...recommendedRules,

        // Possible Problems
        // https://eslint.org/docs/latest/rules/#possible-problems
        // ----------------------------------------
        'array-callback-return': 'error',
        // 'constructor-super': 'error',
        // 'for-direction': 'error',
        // 'getter-return': 'error',
        // 'no-async-promise-executor': 'error',
        // // 'no-await-in-loop': 'error',
        // 'no-class-assign': 'error',
        // 'no-compare-neg-zero': 'error',
        // 'no-cond-assign': ['error', 'always'],
        // 'no-const-assign': 'error',
        // // 'no-constant-binary-expression': 'error',
        // 'no-constant-condition': ['error', { checkLoops: false }],
        // // 'no-constructor-return': 'error',
        // 'no-control-regex': 'error',
        // 'no-debugger': 'error',
        // 'no-dupe-args': 'error',
        // 'no-dupe-class-members': 'error',
        // 'no-dupe-else-if': 'error',
        // 'no-dupe-keys': 'error',
        // 'no-duplicate-case': 'error',
        // // 'no-duplicate-imports': 'error',
        // 'no-empty-character-class': 'error',
        // 'no-empty-pattern': 'error',
        // 'no-ex-assign': 'error',
        // 'no-fallthrough': 'error',
        // 'no-func-assign': 'error',
        // 'no-import-assign': 'error',
        // 'no-inner-declarations': 'error',
        // 'no-invalid-regexp': 'error',
        // 'no-irregular-whitespace': 'error',
        // 'no-loss-of-precision': 'error',
        // 'no-misleading-character-class': 'error',
        // // 'no-new-native-nonconstructor': 'error',
        // 'no-new-symbol': 'error',
        // 'no-obj-calls': 'error',
        // // 'no-promise-executor-return': 'error',
        // 'no-prototype-builtins': 'error',
        // 'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        // 'no-setter-return': 'error',
        // 'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        // 'no-this-before-super': 'error',
        // 'no-undef': 'error',
        // 'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        // 'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        // 'no-unsafe-finally': 'error',
        // 'no-unsafe-negation': 'error',
        // 'no-unsafe-optional-chaining': 'error',
        // // 'no-unused-private-class-members': 'error',
        // // 'no-unused-vars': 'error',
        'no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
          },
        ],
        // 'no-useless-backreference': 'error',
        // // 'require-atomic-updates': 'error',
        // 'use-isnan': [
        //   'error',
        //   {
        //     enforceForSwitchCase: true,
        //     enforceForIndexOf: true,
        //   },
        // ],
        // 'valid-typeof': ['error', { requireStringLiterals: true }],

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
        'arrow-body-style': ['warn', 'as-needed'],
        'block-scoped-var': 'error',
        // // 'camelcase': 'error',
        // // 'capitalized-comments': 'error',
        // // 'class-methods-use-this': 'error',
        // // 'complexity': 'error',
        // // 'consistent-return': 'error',
        // // 'consistent-this': 'error',
        // 'curly': ['warn', 'multi-or-nest', 'consistent'],
        // // 'default-case': 'error',
        'default-case-last': 'error',
        // // 'default-param-last': 'error',
        'dot-notation': ['warn', { allowKeywords: true }],
        'eqeqeq': ['warn', 'smart'],
        // // 'func-name-matching': 'error',
        // // 'func-names': 'error',
        // // 'func-style': 'error',
        // // 'grouped-accessor-pairs': 'error',
        // // 'guard-for-in': 'error',
        // // 'id-denylist': 'error',
        // // 'id-length': 'error',
        // // 'id-match': 'error',
        // // 'init-declarations': 'error',
        'logical-assignment-operators': ['warn', 'always'],
        // // 'max-classes-per-file': 'error',
        // // 'max-depth': 'error',
        // // 'max-lines': 'error',
        // // 'max-lines-per-function': 'error',
        // // 'max-nested-callbacks': 'error',
        // // 'max-params': 'error',
        // // 'max-statements': 'error',
        // // 'multiline-comment-style': ['warn', 'separate-lines'],
        'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
        'no-alert': 'error',
        'no-array-constructor': 'error',
        // // 'no-bitwise': 'error',
        'no-caller': 'error',
        // 'no-case-declarations': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        // // 'no-continue': 'error',
        // 'no-delete-var': 'error',
        // // 'no-div-regex': 'error',
        'no-else-return': 'warn',
        // 'no-empty': ['error', { allowEmptyCatch: true }],
        // // 'no-empty-function': 'error',
        // // 'no-empty-static-block': 'error',
        // // 'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'warn',
        // 'no-extra-boolean-cast': 'warn',
        'no-extra-label': 'warn',
        // 'no-global-assign': 'error',
        // 'no-implicit-coercion': ['error', { allow: ['!!'] }],
        // // 'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        // // 'no-inline-comments': 'error',
        // // 'no-invalid-this': 'error',
        'no-iterator': 'error',
        // // 'no-label-var': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        // 'no-lonely-if': 'warn',
        // // 'no-loop-func': 'error',
        // // 'no-magic-numbers': 'error',
        // // 'no-multi-assign': 'error',
        'no-multi-str': 'error',
        // // 'no-negated-condition': 'error',
        // // 'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-object-constructor': 'error',
        'no-new-wrappers': 'error',
        // 'no-nonoctal-decimal-escape': 'error',
        // 'no-octal': 'error',
        'no-octal-escape': 'error',
        // // 'no-param-reassign': 'error',
        // // 'no-plusplus': 'error',
        'no-proto': 'error',
        // 'no-redeclare': 'error',
        // 'no-regex-spaces': 'warn',
        // // 'no-restricted-exports': 'error',
        // // 'no-restricted-globals': 'error',
        // // 'no-restricted-imports': 'error',
        // // 'no-restricted-properties': 'error',
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],
        'no-return-assign': 'error',
        // // 'no-script-url': 'error',
        'no-sequences': 'error',
        // // 'no-shadow': 'error',
        // 'no-shadow-restricted-names': 'error',
        // // 'no-ternary': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'warn',
        // // 'no-undefined': 'error',
        // // 'no-underscore-dangle': 'error',
        'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
        'no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        }],
        // 'no-unused-labels': 'warn',
        'no-useless-call': 'error',
        // 'no-useless-catch': 'error',
        'no-useless-computed-key': 'warn',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        // 'no-useless-escape': 'error',
        'no-useless-rename': 'warn',
        'no-useless-return': 'warn',
        'no-var': 'warn',
        'no-void': 'error',
        // // 'no-warning-comments': 'error',
        // 'no-with': 'error',
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
        // // 'prefer-destructuring': 'warn',
        'prefer-exponentiation-operator': 'warn',
        // // 'prefer-named-capture-group': 'error',
        'prefer-numeric-literals': 'warn',
        'prefer-object-has-own': 'warn',
        'prefer-object-spread': 'warn',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'warn',
        // // 'radix': 'error',
        'require-await': 'error',
        // // 'require-unicode-regexp': 'error',
        // 'require-yield': 'error',
        // // 'sort-imports': 'warn',
        // // 'sort-keys': 'error',
        // 'sort-vars': 'warn',
        // 'strict': 'warn',
        'symbol-description': 'error',
        'vars-on-top': 'error',
        'yoda': ['warn', 'never'],

        // Layout & Formatting
        // https://eslint.org/docs/latest/rules/#layout--formatting
        // ----------------------------------------
        // // 'line-comment-position': 'error',
        'unicode-bom': ['warn', 'never'],

        ...overrides,
      },
    },
    {
      name: 'byyuurin:scripts-overrides',
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off',
      },
    },
  ]
})
