import fs from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { comments, formatters, ignores, imports, javascript, jsdoc, jsonc, markdown, node, stylistic, toml, typescript, unicorn, unocss, vue, yaml } from '../src/configs'
import { combine } from '../src/utils'

const builtin = {
  plugins: {
    '': { rules: Object.fromEntries(builtinRules.entries()) },
  },
}

const configs = await combine(
  builtin,
  comments(),
  formatters(),
  ignores(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  stylistic(),
  toml(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
  yaml(),
)

const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

await fs.writeFile('src/types-rule.d.ts', dts)
