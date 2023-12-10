// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
// eslint-disable-next-line import/default, import/no-named-as-default, import/no-named-as-default-member
import byyuurin from './dist/index.js'

export default byyuurin(
  {
    vue: true,
    formatters: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
    componentExts: ['vue'],
    overrides: {
      vue: {
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
      },
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
)
