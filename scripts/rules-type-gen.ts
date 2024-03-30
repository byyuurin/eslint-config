import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { comments, formatters, ignores, imports, javascript, jsdoc, jsonc, markdown, node, sortPackageJson, sortTsconfigJson, stylistic, toml, typescript, unicorn, unocss, vue, yaml } from '../src/configs'
import { combine } from '../src/utils'

const configs = await combine(
  comments(),
  formatters(),
  ignores(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  sortPackageJson(),
  sortTsconfigJson(),
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
