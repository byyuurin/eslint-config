// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { byyuurin } from './dist/index.js'

export default byyuurin(
  {
    vue: true,
    formatters: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
    stylistic: {
      overrides: {
        'style/operator-linebreak': [
          'warn',
          'after',
          { overrides: { '?': 'before', ':': 'before' } },
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
