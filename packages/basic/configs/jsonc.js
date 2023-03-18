'use strict'

// https://github.com/ota-meshi/eslint-plugin-jsonc
module.exports = {
  plugins: [
    'jsonc',
  ],
  extends: [
    'plugin:jsonc/base',
  ],
  rules: {
    'jsonc/no-bigint-literals': 'error',
    'jsonc/no-binary-expression': 'warn',
    'jsonc/no-binary-numeric-literals': 'warn',
    'jsonc/no-dupe-keys': 'error',
    'jsonc/no-escape-sequence-in-identifier': 'warn',
    'jsonc/no-floating-decimal': 'warn',
    'jsonc/no-hexadecimal-numeric-literals': 'warn',
    'jsonc/no-infinity': 'error',
    'jsonc/no-multi-str': 'error',
    'jsonc/no-nan': 'error',
    'jsonc/no-number-props': 'warn',
    'jsonc/no-numeric-separators': 'warn',
    'jsonc/no-octal-numeric-literals': 'warn',
    'jsonc/no-octal': 'error',
    'jsonc/no-parenthesized': 'warn',
    'jsonc/no-plus-sign': 'warn',
    'jsonc/no-regexp-literals': 'error',
    'jsonc/no-sparse-arrays': 'error',
    'jsonc/no-template-literals': 'warn',
    'jsonc/no-undefined-value': 'error',
    'jsonc/no-unicode-codepoint-escapes': 'warn',
    'jsonc/no-useless-escape': 'error',
    'jsonc/quote-props': 'warn',
    'jsonc/quotes': 'warn',
    'jsonc/space-unary-ops': 'warn',
    'jsonc/valid-json-number': 'warn',
    'jsonc/vue-custom-block/no-parsing-error': 'error',
  },
}
