import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import { comments, ignores, imports, javascript, jsdoc, jsonc, markdown, node, sortPackageJson, sortTsconfigJson, stylistic, typescript, unicorn, unocss, vue, yaml } from './configs'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import { combine } from './utils'

const flatConfigProps: (keyof FlatConfigItem)[] = [
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
]

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

const UnocssPackages = [
  'unocss',
  '@unocss/webpack',
  '@unocss/nuxt',
]

/**
 * Construct an array of ESLint flat config items.
 */
export async function byyuurin(
  options: OptionsConfig & FlatConfigItem = {},
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
  const {
    componentExts = [],
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    overrides = {},
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
    unocss: enableUnoCSS = UnocssPackages.some((i) => isPackageExists(i)),
  } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}

  if (stylisticOptions && !('jsx' in stylisticOptions))
    stylisticOptions.jsx = true

  const configs: Awaitable<FlatConfigItem[]>[] = []

  // Base configs
  configs.push(
    ignores({
      gitignore: options.gitignore,
    }),
    javascript({
      overrides: overrides.javascript,
    }),
    comments(),
    node(),
    jsdoc({
      stylistic: stylisticOptions,
    }),
    imports({
      isInEditor,
      stylistic: stylisticOptions,
    }),
    unicorn(),
  )

  if (enableTypeScript) {
    configs.push(typescript({
      ...typeof enableTypeScript === 'boolean'
        ? {}
        : enableTypeScript,
      componentExts,
      overrides: overrides.typescript,
    }))
  }

  if (stylisticOptions)
    configs.push(stylistic(stylisticOptions))

  if (enableVue) {
    configs.push(vue({
      ...typeof enableVue === 'boolean'
        ? {}
        : enableVue,
      overrides: overrides.vue,
      stylistic: stylisticOptions,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableUnoCSS)
    configs.push(unocss(typeof enableUnoCSS === 'boolean' ? {} : enableUnoCSS))

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: overrides.jsonc,
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfigJson(),
    )
  }

  if (options.yaml ?? true) {
    configs.push(yaml({
      overrides: overrides.yaml,
      stylistic: stylisticOptions,
    }))
  }

  if (options.markdown ?? true) {
    configs.push(markdown({
      componentExts,
      overrides: overrides.markdown,
    }))
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any

    return acc
  }, {} as FlatConfigItem)

  if (Object.keys(fusedConfig).length > 0)
    configs.push([fusedConfig])

  const merged = await combine(
    ...configs,
    ...userConfigs,
  )

  return merged
}
