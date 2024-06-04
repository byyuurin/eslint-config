import process from 'node:process'
import type { Linter } from 'eslint'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import { comments, formatters, ignores, imports, javascript, jsdoc, jsonc, markdown, node, stylistic, toml, typescript, unicorn, unocss, vue, yaml } from './configs'
import { internalPluginRenaming } from './plugins'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { toUniqueStringArray } from './utils'

const flatConfigProps: (keyof TypedFlatConfigItem)[] = [
  'name',
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
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 * The options for generating the ESLint configurations.
 *
 * @param userConfigs
 * The user configurations to be merged with the generated configurations.
 *
 * @returns {FlatConfigComposer<TypedFlatConfigItem>}
 * The merged ESLint configurations.
 */
export function byyuurin(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any> | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem> {
  const {
    isInEditor = !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
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

  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

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
  }, {} as TypedFlatConfigItem)

  if (Object.keys(fusedConfig).length > 0)
    configs.push([fusedConfig])

  let composer = new FlatConfigComposer<TypedFlatConfigItem>()

  composer = composer.append(
    ...configs,
    ...userConfigs as any,
  )

  composer = composer.renamePlugins(internalPluginRenaming)

  return composer
}

function getOverrides(config: OptionsConfig, key: keyof OptionsConfig) {
  const options = config[key]

  if (!options || typeof options === 'boolean' || !('overrides' in options))
    return {}

  return options.overrides ?? {}
}
