# @byyuurin/eslint-config [![npm](https://img.shields.io/npm/v/@byyuurin/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@byyuurin/eslint-config)

ESLint Flat config for JavaScript, TypeScript, Vue, UnoCSS

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lints also for json, yaml, toml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default

## Usage

### Install

```bash
pnpm i -D eslint @byyuurin/eslint-config
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import byyuurin from '@byyuurin/eslint-config'

export default byyuurin()
```

<details>
<summary>Combined with legacy config:</summary>

If you still use some configs from the legacy eslintrc format,
you can use the [`@eslint/eslintrc`](https://www.npmjs.com/package/@eslint/eslintrc) package
to convert them to the flat config.

```js
// eslint.config.mjs
import byyuurin from '@byyuurin/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default byyuurin(
  {
    ignores: [],
  },

  // Legacy config
  ...compat.config({
    extends: [
      'eslint:recommended',
      // Other extends...
    ],
  }),

  // Other flat configs...
)
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

</details>

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

> [!important]
> Running `npx eslint`, you should be prompted to install the required dependencies.
>
> The first time you enable **formatters** or **unocss**, you need to run the command again.

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Enable the ESlint flat config support
  "eslint.useFlatConfig": true,

  // Silent the stylistic rules in you IDE, but still auto fix them (if set to "off")
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "vue",
    "gql",
    "graphql"
  ]
}
```

## Customization

You can configure each integration individually, for example:

```js
// eslint.config.js
import byyuurin from '@byyuurin/eslint-config'

export default byyuurin({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    'fixtures',
    '**/fixtures',
    // ...globs
  ],
})
```

The factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import byyuurin from '@byyuurin/eslint-config'

export default byyuurin(
  {
    // Configures for byyuurin's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

### Plugins Renaming

Since flat config requires us to explicitly provide the plugin names(instead of the mandatory convention from npm package name),
we renamed some plugins to make the overall scope more consistent and easier to write.

| New Prefix | Original Prefix        | Source Plugin                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `import/*` | `import-x/*`           | [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)                  |
| `node/*`   | `n/*`                  | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                     |
| `yaml/*`   | `yml/*`                | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                        |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*`  | `@stylistic/*`         | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)           |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

Since v1.1.0, this preset will automatically rename the plugins also for your custom configs.
You can use the original prefix to override the rules directly.

### Rules Overrides

You can change the rules via the `overrides` option in each integration:

```js
// eslint.config.js
import byyuurin from '@byyuurin/eslint-config'

export default byyuurin({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
  yaml: {
    overrides: {
      // ...
    },
  },
})
```

### Optional formatters

Use external formatters to format files that ESLint cannot handle yet (`.css`, `.html`, etc).
Powered by [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format).

```js
// eslint.config.js
import byyuurin from '@byyuurin/eslint-config'

export default byyuurin({
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     */
    css: true,
    /**
     * Format HTML files
     * Using custom stylistic rules
     */
    html: {
      indent: 4,
      quotes: 'double',
      semi: true,
    },
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: {
      formatter: 'dprint',
    },
  },
})
```

Running `npx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
npm i -D eslint-plugin-format
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "npm run lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks

# to active the hooks
npx simple-git-hooks
```

> See [Add simple-git-hooks to the project](https://github.com/toplenboren/simple-git-hooks?tab=readme-ov-file#add-simple-git-hooks-to-the-project)

## View what rules are enabled

> [@eslint/config-inspector](https://github.com/eslint/config-inspector), built by [Anthony Fu](https://github.com/antfu), is a visual tool designed to help you view and understand your ESLint Flat config

Go to your project root that contains `eslint.config.js` and run:

```bash
npx @eslint/config-inspector
```

## License

[MIT](./LICENSE) License &copy; 2021-PRESENT [Yuurin](https://github.com/byyuurin)

## Reference

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. [@antfu/eslint-config](https://github.com/antfu/eslint-config)
3. [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
