'use strict'

// https://github.com/ota-meshi/eslint-plugin-yml
module.exports = {
  plugins: [
    'yml',
  ],
  extends: [
    'plugin:yml/base',
  ],
  rules: {
    'yml/block-mapping-question-indicator-newline': 'warn',
    'yml/block-mapping': 'warn',
    'yml/block-sequence-hyphen-indicator-newline': 'warn',
    'yml/block-sequence': 'warn',
    'yml/flow-mapping-curly-newline': 'warn',
    'yml/flow-mapping-curly-spacing': 'warn',
    'yml/flow-sequence-bracket-newline': 'warn',
    'yml/flow-sequence-bracket-spacing': 'warn',
    'yml/indent': 'warn',
    'yml/key-spacing': 'warn',
    'yml/no-empty-document': 'error',
    'yml/no-empty-key': 'error',
    'yml/no-empty-mapping-value': 'error',
    'yml/no-empty-sequence-entry': 'error',
    'yml/no-irregular-whitespace': 'error',
    'yml/no-tab-indent': 'error',
    'yml/plain-scalar': 'warn',
    'yml/quotes': ['warn', { prefer: 'single', avoidEscape: false }],
    'yml/spaced-comment': 'warn',
    'yml/vue-custom-block/no-parsing-error': 'error',
  },
}
