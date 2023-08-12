module.exports = {
  plugins: [
    // https://github.com/ota-meshi/eslint-plugin-jsonc
    'jsonc',
  ],
  extends: [
    'plugin:jsonc/base',
  ],
  rules: {
    // JSONC Rules
    // https://ota-meshi.github.io/eslint-plugin-jsonc/rules/#jsonc-rules
    // ----------------------------------------
    // 'jsonc/auto': 'warn',
    // 'jsonc/key-name-casing': 'error',
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
    // 'jsonc/sort-array-values': 'warn',
    // 'jsonc/sort-keys': 'warn',
    'jsonc/valid-json-number': 'warn',
    'jsonc/vue-custom-block/no-parsing-error': 'error',

    // Extension Rules
    // https://ota-meshi.github.io/eslint-plugin-jsonc/rules/#extension-rules
    // ----------------------------------------
    // 'jsonc/array-bracket-newline': 'warn',
    // 'jsonc/array-bracket-spacing': 'warn',
    // 'jsonc/array-element-newline': 'warn',
    // 'jsonc/comma-dangle': 'warn',
    // 'jsonc/comma-style': 'warn',
    // 'jsonc/indent': 'warn',
    // 'jsonc/key-spacing': 'warn',
    'jsonc/no-dupe-keys': 'error',
    'jsonc/no-floating-decimal': 'warn',
    'jsonc/no-irregular-whitespace': 'error',
    'jsonc/no-multi-str': 'error',
    // 'jsonc/no-octal-escape': 'error',
    'jsonc/no-octal': 'error',
    'jsonc/no-sparse-arrays': 'error',
    'jsonc/no-useless-escape': 'error',
    // 'jsonc/object-curly-newline': 'warn',
    // 'jsonc/object-curly-spacing': 'warn',
    // 'jsonc/object-property-newline': 'warn',
    'jsonc/quote-props': 'warn',
    'jsonc/quotes': 'warn',
    'jsonc/space-unary-ops': 'warn',
  },
}
