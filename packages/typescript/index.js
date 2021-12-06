module.exports = {
  extends: ['@byyuurin/eslint-config-basic', 'plugin:@typescript-eslint/recommended'],

  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-undef': 'off'
  }
}
