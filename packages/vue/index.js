const { isPackageExists } = require('local-pkg')

const withTypescript = isPackageExists('typescript')

if (!withTypescript)
  console.warn('[@byyuurin/eslint-config] TypeScript is not installed, fallback to JS only.')

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    withTypescript
      ? '@byyuurin/eslint-config-typescript'
      : '@byyuurin/eslint-config-basic',
  ],

  plugins: [
    // https://github.com/vuejs/eslint-plugin-vue
    'vue',
  ],

  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-undef': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'simple-import-sort/imports': ['warn', {
          groups: [
            ['^\\u0000'],
            ['^vue', '^@?\\w'],
            ['^', '^\\.'],
          ],
        }],
      },
    },
  ],

  rules: {
    /* Essential
    ---------------------------------------- */
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'error',

    'vue/no-deprecated-data-object-declaration': 'warn',
    'vue/no-deprecated-destroyed-lifecycle': 'warn',
    'vue/no-deprecated-dollar-scopedslots-api': 'warn',
    'vue/no-deprecated-scope-attribute': 'warn',
    'vue/no-deprecated-slot-attribute': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    'vue/no-deprecated-v-on-number-modifiers': 'warn',
    'vue/no-ref-as-operand': 'warn',
    'vue/no-shared-component-data': 'warn',
    'vue/prefer-import-from-vue': 'warn',
    'vue/require-prop-type-constructor': 'warn',

    /* Strongly Recommended
    ---------------------------------------- */
    'vue/attribute-hyphenation': 'warn',
    'vue/component-definition-name-casing': 'warn',
    'vue/first-attribute-linebreak': 'warn',
    'vue/html-closing-bracket-newline': 'warn',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/html-end-tags': 'warn',
    'vue/html-indent': 'warn',
    'vue/html-quotes': 'warn',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multiline-html-element-content-newline': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
    'vue/singleline-html-element-content-newline': 'warn',
    'vue/v-bind-style': 'warn',
    'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true }],
    'vue/v-on-style': 'warn',
    'vue/v-slot-style': 'warn',

    // off
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',

    /* Recommended
    ---------------------------------------- */
    'vue/attributes-order': 'warn',
    'vue/component-tags-order': [
      'warn',
      { order: ['script', 'template', 'style'] },
    ],
    'vue/order-in-components': 'warn',
    'vue/this-in-template': 'warn',

    // off
    'vue/no-v-html': 'off',

    /* Uncategorized
    ---------------------------------------- */
    'vue/block-tag-newline': [
      'warn',
      { singleline: 'always', multiline: 'always' },
    ],
    'vue/component-name-in-template-casing': [
      'warn', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/component-options-name-casing': ['warn', 'PascalCase'],
    'vue/custom-event-name-casing': [
      'error', 'kebab-case',
      { ignores: [] },
    ],
    'vue/define-macros-order': 'warn',
    'vue/html-comment-content-newline': 'warn',
    'vue/html-comment-content-spacing': [
      'warn', 'always',
      { exceptions: [] },
    ],
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/padding-line-between-blocks': ['warn', 'always'],
    'vue/padding-line-between-tags': ['warn', [{ blankLine: 'never', prev: '*', next: '*' }]],
    'vue/prefer-separate-static-class': 'warn',

    /* Extension Rules
    ---------------------------------------- */
    'vue/array-bracket-newline': ['warn', { multiline: true }],
    'vue/array-bracket-spacing': ['warn', 'never'],
    'vue/arrow-spacing': ['warn', { before: true, after: true }],
    'vue/block-spacing': ['warn', 'always'],
    'vue/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],
    'vue/camelcase': 'off',
    'vue/comma-dangle': ['warn', 'always-multiline'],
    'vue/comma-spacing': ['warn', { before: false, after: true }],
    'vue/comma-style': ['warn', 'last'],
    'vue/dot-location': ['warn', 'property'],
    'vue/dot-notation': ['warn', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'smart'],
    'vue/func-call-spacing': ['warn', 'never'],
    'vue/key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'vue/keyword-spacing': ['warn', { before: true, after: true }],
    'vue/max-len': 'off',
    'vue/no-constant-condition': ['error', { checkLoops: false }],
    'vue/no-empty-pattern': 'error',
    'vue/no-extra-parens': ['warn', 'functions'],
    'vue/no-irregular-whitespace': 'error',
    'vue/no-loss-of-precision': 'error',
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'vue/no-sparse-arrays': 'error',
    'vue/no-useless-concat': 'error',
    'vue/object-curly-newline': ['warn', { multiline: true, consistent: true }],
    'vue/object-curly-spacing': ['warn', 'always'],
    'vue/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
    'vue/object-shorthand': ['warn', 'always', { ignoreConstructors: false, avoidQuotes: true }],
    'vue/operator-linebreak': ['warn', 'before'],
    'vue/prefer-template': 'warn',
    'vue/quote-props': ['warn', 'consistent-as-needed'],
    'vue/space-in-parens': ['warn', 'never'],
    'vue/space-infix-ops': 'warn',
    'vue/space-unary-ops': ['warn', { words: true, nonwords: false }],
    'vue/template-curly-spacing': ['warn', 'never'],
  },
}
