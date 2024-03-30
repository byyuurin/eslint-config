import fs from 'node:fs'
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
      name: 'byyuurin:ignores',
      ignores: GLOB_EXCLUDE,
    },
  ]

  if (enableGitignore) {
    await interopDefault(import('eslint-config-flat-gitignore')).then((r) => {
      if (typeof enableGitignore === 'object') {
        items.push(r(enableGitignore))
        return
      }

      if (fs.existsSync('.gitignore'))
        items.push(r())
    })
  }

  return items
})
