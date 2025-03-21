import type { Linter } from 'eslint'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import { comments, disables, formatters, ignores, imports, javascript, jsdoc, jsonc, markdown, node, stylistic, toml, typescript, unicorn, unocss, unocssPluginName, vue, yaml } from './configs'
import { internalPluginRenaming } from './plugins'
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types'
import { isInEditorEnv, toUniqueStringArray } from './utils'

const flatConfigProps: (keyof TypedFlatConfigItem)[] = [
  'name',
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
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export function byyuurin(
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
    unocss: enableUnoCSS = UnocssPackages.some((i) => isPackageExists(i)) && isPackageExists(unocssPluginName),
  } = options

  let isInEditor = options.isInEditor

  if (isInEditor == null) {
    isInEditor = isInEditorEnv()

    if (isInEditor) {
      // eslint-disable-next-line no-console
      console.log('[@byyuurin/eslint-config] Detected running in editor, some rules are disabled.')
    }
  }

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
      userIgnores: options.ignores,
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

  configs.push(disables())

  if ('files' in options)
    throw new Error('[@byyuurin/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.')

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      // @ts-expect-error ignore check
      acc[key] = options[key]

    return acc
  }, {} as TypedFlatConfigItem)

  if (Object.keys(fusedConfig).length > 0)
    configs.push([fusedConfig])

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

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
