import { defineFlatConfigProvider } from '../helpers'
import { interopDefault } from '../utils'

export const comments = defineFlatConfigProvider(async () => [
  {
    name: 'byyuurin:eslint-comments',
    plugins: {
      // @ts-expect-error missing types
      'eslint-comments': await interopDefault(import('eslint-plugin-eslint-comments')),
    },
    rules: {
      'eslint-comments/no-aggregating-enable': 'error',
      'eslint-comments/no-duplicate-disable': 'error',
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-enable': 'error',
    },
  },
])
