// ref: https://github.com/antfu/eslint-config/blob/main/src/types.ts

import type { EslintCommentsRules, EslintRules, FlatESLintConfigItem, ImportRules, JsoncRules, MergeIntersection, NRules, Prefix, RenamePrefix, RuleConfig, VueRules, YmlRules } from '@antfu/eslint-define-config'
import type { RuleOptions as JSDocRules } from '@eslint-types/jsdoc/types'
import type { RuleOptions as TypeScriptRules } from '@eslint-types/typescript-eslint/types'
import type { RuleOptions as UnicornRules } from '@eslint-types/unicorn/types'
import type { StylisticCustomizeOptions, UnprefixedRuleOptions as StylisticRules } from '@stylistic/eslint-plugin'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { Rules as AntfuRules } from 'eslint-plugin-antfu'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type { VendoredDprintOptions } from './vender/dprint-types'
import type { VendoredPrettierOptions } from './vender/prettier-types'

export type Awaitable<T> = T | Promise<T>

export type WrapRuleConfig<T extends { [key: string]: any }> = {
  [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>
}

export type Rules = WrapRuleConfig<
  MergeIntersection<
    RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'> &
    RenamePrefix<YmlRules, 'yml/', 'yaml/'> &
    RenamePrefix<NRules, 'n/', 'node/'> &
    Prefix<StylisticRules, 'style/'> &
    Prefix<AntfuRules, 'antfu/'> &
    JSDocRules &
    ImportRules &
    EslintRules &
    EslintCommentsRules &
    JsoncRules &
    VueRules &
    UnicornRules
    // TODO: TOML rules
  >
>

export type FlatConfigItem = Omit<FlatESLintConfigItem<Rules, false>, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}

export type UserConfigItem = FlatConfigItem | Linter.FlatConfig

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[]
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}

export interface OptionsOverrides {
  overrides?: FlatConfigItem['rules']
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsVue {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions

  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: 2 | 3
}

export interface OptionsUnoCSS {
  /**
   * Enable attributify support.
   * @default false
   */
  attributify?: boolean
  /**
   * Enable strict mode by throwing errors about blocklisted classes.
   * @default false
   */
  strict?: boolean
}

export type FormatterConfig<Formatter extends string = 'prettier' | 'dprint'> = ({ formatter: Formatter } & Pick<StylisticConfig, 'indent' | 'quotes' | 'semi'>)

export interface OptionsFormatters {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   *
   * Currently only support Prettier.
   */
  css?: FormatterConfig<'prettier'> | boolean

  /**
   * Enable formatting support for HTML.
   *
   * Currently only support Prettier.
   */
  html?: FormatterConfig<'prettier'> | boolean

  /**
   * Enable formatting support for Markdown.
   *
   * Support both Prettier and dprint.
   *
   * When set to `true`, it will use Prettier.
   */
  markdown?: FormatterConfig<'prettier' | 'dprint'> | boolean

  /**
   * Enable formatting support for GraphQL.
   */
  graphql?: FormatterConfig<'prettier'> | boolean

  /**
   * Custom options for Prettier.
   *
   * By default it's controlled by our own config.
   */
  prettierOptions?: VendoredPrettierOptions

  /**
   * Custom options for dprint.
   *
   * By default it's controlled by our own config.
   */
  dprintOptions?: VendoredDprintOptions
}

export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * Core rules. Can't be disabled.
   */
  javascript?: OptionsOverrides

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | (OptionsTypeScriptWithTypes & OptionsOverrides) | (OptionsTypeScriptParserOptions & OptionsOverrides)

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | (OptionsVue & OptionsOverrides)

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OptionsOverrides

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsOverrides

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: boolean | OptionsOverrides

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | (StylisticConfig & OptionsOverrides)

  /**
   * Enable unocss rules.
   *
   * Requires installing:
   * - `@unocss/eslint-plugin`
   *
   * @default auto-detect based on the dependencies
   */
  unocss?: boolean | OptionsUnoCSS

  /**
   * Use external formatters to format files.
   *
   * Requires installing:
   * - `eslint-plugin-format`
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default false
   */
  formatters?: boolean | OptionsFormatters

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean
}
