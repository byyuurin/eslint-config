module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@byyuurin/eslint-config-basic',
    '@byyuurin/eslint-config-prettier'
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
