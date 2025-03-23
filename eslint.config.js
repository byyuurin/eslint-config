// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)

/**
 * @type {import('./src').default}
 */
const byyuurin = await jiti.import('./src', { default: true })

export default byyuurin(
  {
    vue: true,
    formatters: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
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
  {
    files: ['test/types.ts'],
    rules: {
      'unicorn/no-unreadable-iife': 'off',
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
)
