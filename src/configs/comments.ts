import { defineFlatConfigProvider } from '../helpers'
import { pluginComments } from '../plugins'

export const comments = defineFlatConfigProvider(() => [
  {
    name: 'byyuurin/eslint-comments/rules',
    plugins: {
      'eslint-comments': pluginComments,
    },
    rules: {
      'eslint-comments/no-aggregating-enable': 'error',
      'eslint-comments/no-duplicate-disable': 'error',
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-enable': 'error',
    },
  },
])
