import { mergeProcessors } from 'eslint-merge-processors'
import { GLOB_VUE } from '../globs'
import { defineFlatConfigProvider } from '../helpers'
import type { OptionsFiles, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic, OptionsVue } from '../types'
import { interopDefault } from '../utils'

export const vue = defineFlatConfigProvider(async (
  options: OptionsFiles & OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsVue = {},
) => {
  const {
    files = [GLOB_VUE],
    overrides = {},
    stylistic = true,
    vueVersion = 3,
  } = options

  const sfcBlocks = options.sfcBlocks === true
    ? {}
    : options.sfcBlocks ?? {}

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginVue,
    parserVue,
    processorVueBlocks,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    interopDefault(import('eslint-processor-vue-blocks')),
  ] as const)

  return [
    {
      name: 'byyuurin/vue/setup',
      plugins: {
        vue: pluginVue,
      },
    },
    {
      name: 'byyuurin/vue/rules',
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: options.typescript
            ? await interopDefault(import('@typescript-eslint/parser')) as any
            : null,
          sourceType: 'module',
        },
      },
      processor: sfcBlocks === false
        ? pluginVue.processors['.vue']
        : mergeProcessors([
            pluginVue.processors['.vue'],
            processorVueBlocks({
              ...sfcBlocks,
              blocks: {
                styles: true,
                ...sfcBlocks.blocks,
              },
            }),
          ]),
      files,
      rules: {
        'import/first': 'off',
        'node/prefer-global/process': 'off',
        'ts/no-redeclare': 'off',

        ...pluginVue.configs.base.rules,

        ...vueVersion === 2
          ? {
              ...pluginVue.configs['vue2-essential'].rules,
              ...pluginVue.configs['vue2-strongly-recommended'].rules,
              ...pluginVue.configs['vue2-recommended'].rules,
            }
          : {
              ...pluginVue.configs['flat/essential'].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
              ...pluginVue.configs['flat/strongly-recommended'].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
              ...pluginVue.configs['flat/recommended'].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
            },

        // Essential
        // ----------------------------------------
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',

        // Strongly Recommended
        // ----------------------------------------
        'vue/html-indent': ['error', indent],

        'vue/html-self-closing': [
          'warn',
          {
            html: {
              void: 'always',
              normal: 'never',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],

        'vue/max-attributes-per-line': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',

        // Recommended
        // ----------------------------------------
        'vue/no-v-html': 'off',

        // Uncategorized
        // ----------------------------------------
        'vue/no-setup-props-reactivity-loss': 'off',

        'vue/block-order': [
          'warn',
          { order: ['script', 'template', 'style'] },
        ],
        'vue/component-name-in-template-casing': [
          'warn',
          'PascalCase',
          {
            registeredComponentsOnly: false,
            ignores: [],
          },
        ],
        'vue/component-options-name-casing': ['warn', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'vue/define-macros-order': ['warn', {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/html-comment-content-newline': ['warn', {
          singleline: 'never',
          multiline: 'ignore',
        }],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-unused-refs': 'error',
        'vue/no-useless-mustaches': 'warn',
        'vue/no-useless-v-bind': 'warn',
        'vue/prefer-separate-static-class': 'warn',

        // Extension Rules
        // ----------------------------------------
        'vue/camelcase': 'off',
        'vue/dot-location': ['warn', 'property'],
        'vue/dot-notation': ['warn', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/max-len': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': ['warn', 'functions'],
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-useless-concat': 'error',
        'vue/object-shorthand': ['warn', 'always', { ignoreConstructors: false, avoidQuotes: true }],
        'vue/prefer-template': 'warn',
        'vue/space-infix-ops': 'warn',
        'vue/space-unary-ops': ['warn', { words: true, nonwords: false }],

        // Deprecated
        // ----------------------------------------
        'vue/component-tags-order': 'off',

        ...stylistic
          ? {
              'vue/array-bracket-spacing': ['warn', 'never'],
              'vue/arrow-spacing': ['warn', { before: true, after: true }],
              'vue/block-spacing': ['warn', 'always'],
              'vue/block-tag-newline': ['warn', { singleline: 'always', multiline: 'always' }],
              'vue/brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],
              'vue/comma-dangle': ['warn', 'always-multiline'],
              'vue/comma-spacing': ['warn', { before: false, after: true }],
              'vue/comma-style': ['warn', 'last'],
              'vue/html-comment-content-spacing': ['warn', 'always', { exceptions: ['-'] }],
              'vue/key-spacing': ['warn', { beforeColon: false, afterColon: true }],
              'vue/keyword-spacing': ['warn', { before: true, after: true }],
              'vue/max-attributes-per-line': ['warn', { singleline: 9, multiline: 1 }],
              'vue/object-curly-newline': ['warn', { multiline: true, consistent: true }],
              'vue/object-curly-spacing': ['warn', 'always'],
              'vue/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
              'vue/operator-linebreak': ['warn', 'before'],
              'vue/padding-line-between-blocks': ['warn', 'always'],
              'vue/quote-props': ['warn', 'consistent-as-needed'],
              'vue/space-in-parens': ['warn', 'never'],
              'vue/template-curly-spacing': ['warn', 'never'],
            }
          : {},

        ...overrides,
      },
    },
  ]
})
