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

const configNames = configs.map((i) => i.name!).filter(Boolean)

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts = `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
${dts}`

await fs.writeFile('src/types-rule.d.ts', dts)
