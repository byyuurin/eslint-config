module.exports = {
  plugins: [
    // https://github.com/ota-meshi/eslint-plugin-yml
    'yml',
  ],
  extends: [
    'plugin:yml/base',
  ],
  rules: {
    // YAML Rules
    // https://ota-meshi.github.io/eslint-plugin-yml/rules/#yaml-rules
    // ----------------------------------------
    // 'yml/block-mapping-colon-indicator-newline': 'warn',
    'yml/block-mapping-question-indicator-newline': 'warn',
    'yml/block-mapping': 'warn',
    'yml/block-sequence-hyphen-indicator-newline': 'warn',
    'yml/block-sequence': 'warn',
    // 'yml/file-extension': 'error',
    'yml/indent': 'warn',
    // 'yml/key-name-casing': 'error',
    'yml/no-empty-document': 'error',
    'yml/no-empty-key': 'error',
    'yml/no-empty-mapping-value': 'error',
    'yml/no-empty-sequence-entry': 'error',
    'yml/no-tab-indent': 'error',
    // 'yml/no-trailing-zeros': 'warn',
    'yml/plain-scalar': 'warn',
    'yml/quotes': ['warn', { prefer: 'single', avoidEscape: false }],
    // 'yml/require-string-key': 'error',
    // 'yml/sort-keys': 'warn',
    // 'yml/sort-sequence-values': 'warn',
    'yml/vue-custom-block/no-parsing-error': 'error',

    // Extension Rules
    // https://ota-meshi.github.io/eslint-plugin-yml/rules/#extension-rules
    // ----------------------------------------
    'yml/flow-mapping-curly-newline': 'warn',
    'yml/flow-mapping-curly-spacing': 'warn',
    'yml/flow-sequence-bracket-newline': 'warn',
    'yml/flow-sequence-bracket-spacing': 'warn',
    'yml/key-spacing': 'warn',
    'yml/no-irregular-whitespace': 'error',
    // 'yml/no-multiple-empty-lines': 'warn',
    'yml/spaced-comment': 'warn',
  },
}
