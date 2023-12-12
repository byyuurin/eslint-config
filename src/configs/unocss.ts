import { defineFlatConfigProvider } from '../helpers'
import type { OptionsUnoCSS } from '../types'
import { interopDefault, toArray } from '../utils'

const packageName = '@unocss/eslint-plugin'

export const unocssRequirePackages = toArray(packageName)

export const unocss = defineFlatConfigProvider(async (
  options: OptionsUnoCSS = {},
) => {
  const {
    attributify = false,
    strict = false,
  } = options

  return [
    {
      name: 'byyuurin:unocss',
      plugins: {
        unocss: await interopDefault(import(packageName)),
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
