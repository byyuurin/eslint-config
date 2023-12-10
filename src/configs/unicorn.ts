import { defineFlatConfigProvider } from '../helpers'
import { interopDefault } from '../utils'

// https://github.com/sindresorhus/eslint-plugin-unicorn
export const unicorn = defineFlatConfigProvider(async () => [
  {
    name: 'byyuurin:unicorn',
    plugins: {
      // @ts-expect-error missing types
      unicorn: await interopDefault(import('eslint-plugin-unicorn')),
    },
    rules: {
      // 'unicorn/better-regex': 'warn',
      // 'unicorn/catch-error-name': 'warn',
      // 'unicorn/consistent-destructuring': 'warn',
      'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
      'unicorn/custom-error-definition': 'warn',
      'unicorn/empty-brace-spaces': 'warn',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'warn',
      // 'unicorn/expiring-todo-comments': 'error',
      'unicorn/explicit-length-check': 'warn',
      // 'unicorn/filename-case': 'error',
      // 'unicorn/import-style': 'error',
      'unicorn/new-for-builtins': 'warn',
      // 'unicorn/no-abusive-eslint-disable': 'error',
      // 'unicorn/no-array-callback-reference': 'error',
      // 'unicorn/no-array-for-each': 'error',
      // 'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-array-push-push': 'warn',
      // 'unicorn/no-array-reduce': 'error',
      'unicorn/no-await-expression-member': 'warn',
      'unicorn/no-console-spaces': 'warn',
      'unicorn/no-document-cookie': 'error',
      // 'unicorn/no-empty-file': 'error',
      'unicorn/no-for-loop': 'warn',
      'unicorn/no-hex-escape': 'warn',
      'unicorn/no-instanceof-array': 'warn',
      'unicorn/no-invalid-remove-event-listener': 'error',
      // 'unicorn/no-keyword-prefix': 'error',
      'unicorn/no-lonely-if': 'warn',
      'unicorn/no-negated-condition': 'warn',
      // 'unicorn/no-nested-ternary': 'warn',
      'unicorn/no-new-array': 'warn',
      'unicorn/no-new-buffer': 'warn',
      // 'unicorn/no-null': 'warn',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-static-only-class': 'warn',
      // 'unicorn/no-thenable': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'warn',

      'prefer-destructuring': ['warn', { object: true, array: false }],
      'unicorn/no-unreadable-array-destructuring': 'warn',

      'unicorn/no-unreadable-iife': 'error',
      // 'unicorn/no-unused-properties': 'error',
      'unicorn/no-useless-fallback-in-spread': 'warn',
      'unicorn/no-useless-length-check': 'warn',
      'unicorn/no-useless-promise-resolve-reject': 'warn',
      'unicorn/no-useless-spread': 'warn',
      'unicorn/no-useless-switch-case': 'error',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/no-zero-fractions': 'warn',
      'unicorn/number-literal-case': 'warn',
      // 'unicorn/numeric-separators-style': 'warn',
      // 'unicorn/prefer-add-event-listener': 'warn',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-array-flat': 'warn',
      'unicorn/prefer-array-flat-map': 'warn',
      'unicorn/prefer-array-index-of': 'warn',
      'unicorn/prefer-array-some': 'warn',
      // 'unicorn/prefer-at': 'warn',
      // 'unicorn/prefer-blob-reading-methods': 'error',
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-date-now': 'warn',
      'unicorn/prefer-default-parameters': 'warn',
      'unicorn/prefer-dom-node-append': 'warn',
      'unicorn/prefer-dom-node-dataset': 'warn',
      'unicorn/prefer-dom-node-remove': 'warn',
      'unicorn/prefer-dom-node-text-content': 'error',
      // 'unicorn/prefer-event-target': 'error',
      // 'unicorn/prefer-export-from': 'warn',
      'unicorn/prefer-includes': 'warn',
      // 'unicorn/prefer-json-parse-buffer': 'warn',
      'unicorn/prefer-keyboard-event-key': 'warn',
      // 'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-math-trunc': 'warn',
      'unicorn/prefer-modern-dom-apis': 'warn',
      'unicorn/prefer-modern-math-apis': 'warn',
      // 'unicorn/prefer-module': 'warn',
      'unicorn/prefer-native-coercion-functions': 'warn',
      'unicorn/prefer-negative-index': 'warn',
      'unicorn/prefer-node-protocol': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/prefer-object-from-entries': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
      'unicorn/prefer-prototype-methods': 'warn',
      'unicorn/prefer-query-selector': 'warn',
      'unicorn/prefer-reflect-apply': 'warn',
      'unicorn/prefer-regexp-test': 'warn',
      'unicorn/prefer-set-has': 'warn',
      'unicorn/prefer-set-size': 'warn',
      // 'unicorn/prefer-spread': 'warn',
      // 'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/prefer-string-slice': 'warn',
      'unicorn/prefer-string-starts-ends-with': 'warn',
      'unicorn/prefer-string-trim-start-end': 'warn',
      'unicorn/prefer-switch': 'warn',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/prefer-type-error': 'warn',
      // 'unicorn/prevent-abbreviations': 'warn',
      'unicorn/relative-url-style': ['warn', 'never'],
      'unicorn/require-array-join-separator': 'warn',
      'unicorn/require-number-to-fixed-digits-argument': 'warn',
      // 'unicorn/require-post-message-target-origin': 'error',
      // 'unicorn/string-content': 'warn',
      'unicorn/switch-case-braces': ['warn', 'avoid'],
      // 'unicorn/template-indent': 'warn',
      'unicorn/text-encoding-identifier-case': 'error',
      'unicorn/throw-new-error': 'warn',
    },
  },
])
