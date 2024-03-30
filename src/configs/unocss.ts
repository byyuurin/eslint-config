import { defineFlatConfigProvider } from '../helpers'
import type { OptionsUnoCSS } from '../types'
import { ensurePackages, interopDefault } from '../utils'

const packageName = '@unocss/eslint-plugin'

export const unocss = defineFlatConfigProvider(async (
  options: OptionsUnoCSS = {},
) => {
  await ensurePackages([packageName])

  const {
    attributify = false,
    strict = false,
  } = options

  return [
    {
      name: 'byyuurin:unocss:rules',
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
