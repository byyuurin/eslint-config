import { GLOB_EXCLUDE } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsConfig, TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'

export const ignores = defineFlatConfigProvider(async (
  options: Pick<OptionsConfig, 'gitignore'> = {},
) => {
  const {
    gitignore: enableGitignore = true,
  } = options

  const items: TypedFlatConfigItem[] = [
    {
      name: 'byyuurin/ignores/defaults',
      ignores: GLOB_EXCLUDE,
    },
  ]

  if (enableGitignore) {
    await interopDefault(import('eslint-config-flat-gitignore')).then((r) => {
      if (typeof enableGitignore !== 'boolean') {
        items.push(r(enableGitignore))
        return
      }

      items.push(r({ strict: false }))
    })
  }

  return items
})
