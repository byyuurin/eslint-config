import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { defineFlatConfigProvider } from '../helpers'

export const disables = defineFlatConfigProvider(() => [
  {
    name: 'byyuurin/disables/scripts',
    files: [`**/scripts/${GLOB_SRC}`],
    rules: {
      'no-console': 'off',
      'antfu/no-top-level-await': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },
  {
    name: 'byyuurin/disables/cli',
    files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
    rules: {
      'no-console': 'off',
      'antfu/no-top-level-await': 'off',
    },
  },
  {
    name: 'byyuurin/disables/bin',
    files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
    rules: {
      'antfu/no-import-dist': 'off',
      'antfu/no-import-node-modules-by-path': 'off',
    },
  },
  {
    name: 'byyuurin/disables/dts',
    files: ['**/*.d.?([cm])ts'],
    rules: {
      'no-restricted-syntax': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    name: 'byyuurin/disables/test',
    files: ['**/*.{test,spec}.([tj])s?(x)'],
    rules: {
      'no-unused-expressions': 'off',
      'antfu/no-top-level-await': 'off',
    },
  },
  {
    name: 'byyuurin/disables/cjs',
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      'ts/no-require-imports': 'off',
    },
  },
  {
    name: 'byyuurin/disables/config-files',
    files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
    rules: {
      'antfu/no-top-level-await': 'off',
      'no-console': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },
])
