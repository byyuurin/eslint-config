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

  const packageName = '@unocss/eslint-plugin'

  await ensurePackages([
    packageName,
  ])

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
