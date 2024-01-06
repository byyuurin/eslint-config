import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import { comments, formatters, formattersRequirePackages, ignores, imports, javascript, jsdoc, jsonc, markdown, node, sortPackageJson, sortTsconfigJson, stylistic, toml, typescript, unicorn, unocss, unocssRequirePackages, vue, yaml } from './configs'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import { combine, ensurePackages, toUniqueStringArray } from './utils'

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
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
    unocss: enableUnoCSS = UnocssPackages.some((i) => isPackageExists(i)),
  } = options

  let { componentExts = [] } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}

  if (stylisticOptions && !('jsx' in stylisticOptions))
    stylisticOptions.jsx = true

  if (enableVue)
    componentExts = toUniqueStringArray([...componentExts, 'vue'])

  const installPackages = toUniqueStringArray([
    ...enableUnoCSS ? unocssRequirePackages : [],
    ...options.formatters ? formattersRequirePackages : [],
  ])

  if (installPackages.length > 0)
    await ensurePackages(installPackages)

  const configs: Awaitable<FlatConfigItem[]>[] = []

  // Base configs
  configs.push(
    ignores({
      gitignore: options.gitignore,
    }),
    javascript({
      overrides: getOverrides(options, 'javascript'),
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
    }))
  }

  if (stylisticOptions)
    configs.push(stylistic(stylisticOptions))

  if (enableVue) {
    configs.push(vue({
      ...typeof enableVue === 'boolean'
        ? {}
        : enableVue,
      stylistic: stylisticOptions,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableUnoCSS) {
    configs.push(unocss(
      typeof enableUnoCSS === 'boolean'
        ? {}
        : enableUnoCSS,
    ))
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfigJson(),
    )
  }

  if (options.yaml ?? true) {
    configs.push(yaml({
      overrides: getOverrides(options, 'yaml'),
      stylistic: stylisticOptions,
    }))
  }

  if (options.toml ?? true) {
    configs.push(toml({
      overrides: getOverrides(options, 'toml'),
      stylistic: stylisticOptions,
    }))
  }

  if (options.markdown ?? true) {
    configs.push(markdown({
      componentExts,
      overrides: getOverrides(options, 'markdown'),
    }))
  }

  if (options.formatters) {
    configs.push(formatters({
      ...options.formatters === true ? {} : options.formatters,
      stylistic: stylisticOptions,
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

function getOverrides(config: OptionsConfig, key: keyof OptionsConfig) {
  const options = config[key]

  if (!options || typeof options === 'boolean' || !('overrides' in options))
    return {}

  return options.overrides ?? {}
}
