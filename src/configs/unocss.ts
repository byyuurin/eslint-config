import { defineFlatConfigProvider } from '../helpers'
import type { OptionsUnoCSS } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export const unocss = defineFlatConfigProvider(async (
  options: OptionsUnoCSS = {},
) => {
  const {
    attributify = false,
    strict = false,
  } = options

  await ensurePackages([
    '@unocss/eslint-plugin',
  ])

  return [
    {
      name: 'byyuurin:unocss',
      plugins: {
        unocss: await interopDefault(import('@unocss/eslint-plugin')),
      },
      rules: {
        'unocss/order': 'warn',
        ...attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {},
        ...strict
          ? {
              'unocss/blocklist': 'error',
            }
          : {},
      },
    },
  ]
})
