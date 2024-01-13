import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { afterAll, beforeAll, it } from 'vitest'
import type { FlatConfigItem, OptionsConfig } from '../src/types'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('js', {
  typescript: false,
  vue: false,
})

runWithConfig(
  'all',
  {
    typescript: true,
    vue: true,
  },
  {
    rules: {
      'no-useless-escape': 'off',
    },
  },
)

runWithConfig(
  'no-style',
  {
    typescript: true,
    vue: true,
    stylistic: false,
  },
  {
    rules: {
      'no-useless-escape': 'off',
    },
  },
)

runWithConfig(
  'tab-double-quotes',
  {
    typescript: true,
    vue: true,
    stylistic: {
      indent: 'tab',
      quotes: 'double',
    },
  },
  {
    rules: {
      'no-mixed-spaces-and-tabs': 'off',
      'no-useless-escape': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
    },
  },
)

runWithConfig(
  'ts-override',
  {
    typescript: true,
  },
  {
    rules: {
      'no-useless-escape': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
)

runWithConfig(
  'with-formatters',
  {
    typescript: true,
    vue: true,
    formatters: true,
  },
  {
    rules: {
      'no-useless-escape': 'off',
    },
  },
)

runWithConfig(
  'with-formatters-customize',
  {
    formatters: {
      html: {
        formatter: 'prettier',
        indent: 'tab',
      },
      css: {
        formatter: 'prettier',
        quotes: 'double',
      },
      markdown: {
        formatter: 'dprint',
      },
    },
  },
  {
    rules: {
      'no-useless-escape': 'off',
      'style/no-tabs': 'off',
    },
  },
)

runWithConfig(
  'no-markdown-with-formatters',
  {
    vue: false,
    markdown: false,
    formatters: {
      markdown: true,
    },
  },
  {
    rules: {
      'no-useless-escape': 'off',
    },
  },
)

runWithConfig(
  'overrides',
  {
    javascript: {
      overrides: {
        'prefer-const': 'off',
      },
    },
    typescript: {
      overrides: {
        'prefer-const': 'off',
      },
    },
    vue: {
      overrides: {
        'vue/html-quotes': ['error', 'single'],
      },
    },
  },
  {
    rules: {
      'no-useless-escape': 'off',
    },
  },
)

function runWithConfig(name: string, configs: OptionsConfig, ...items: FlatConfigItem[]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    await fs.copy(from, target, {
      filter: (src) => !src.includes('node_modules'),
    })

    await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import { byyuurin } from '@byyuurin/eslint-config'

export default byyuurin(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items) ?? []},
)
  `)

    await execa('npx', ['eslint', '.', '--cache', '--fix'], {
      cwd: target,
      stdio: 'pipe',
    })

    const files = await fg('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf8')
      const source = await fs.readFile(join(from, file), 'utf8')
      const outputPath = join(output, file)

      if (content === source) {
        if (fs.existsSync(outputPath))
          fs.remove(outputPath)

        return
      }

      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, 30_000)
}
