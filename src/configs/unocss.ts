import { defineFlatConfigProvider } from '../helpers'
import type { OptionsUnoCSS } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export const unocssPluginName = '@unocss/eslint-plugin'

export const unocss = defineFlatConfigProvider(async (
  options: OptionsUnoCSS = {},
) => {
  await ensurePackages([unocssPluginName])

  const {
    attributify = false,
    strict = false,
  } = options

  return [
    {
      name: 'byyuurin/unocss/rules',
      plugins: {
        unocss: await interopDefault(import(unocssPluginName)),
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
