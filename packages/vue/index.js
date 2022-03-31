module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-undef': 'off',
      },
    },
  ],

  extends: [
    'plugin:vue/vue3-recommended',
    '@byyuurin/eslint-config-typescript',
  ],

  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
  },
}
